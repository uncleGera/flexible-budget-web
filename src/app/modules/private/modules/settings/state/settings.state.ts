import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs/operators';

import { DAY_COLORS, ISettingsDay, ISettingsPeriod, SettingsService } from '../shared';
import { FetchPeriod, SelectDay, SetHoveredDay } from './settings.actions';
import { SettingsStateModel } from './settings.model';

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    periods: [],
    days: null
  }
})
export class SettingsState implements NgxsOnInit {
  constructor(private settingsService: SettingsService) {}

  /**
   * Selectors
   */
  @Selector()
  public static days({ days }: SettingsStateModel): ISettingsDay[] {
    // console.log(days);
    return days;
  }

  /**
   * Dispatch FetchPeriod on start
   */
  public ngxsOnInit(ctx: StateContext<SettingsStateModel>) {
    ctx.dispatch(new FetchPeriod());
  }

  /**
   * Commands
   */
  @Action(FetchPeriod)
  public fetchPeriod(ctx: StateContext<SettingsStateModel>) {
    return this.settingsService.getPeriods().pipe(
      tap(periods => {
        let days: ISettingsDay[] = [];
        let colorIndex = 0;

        if (!periods.length) {
          for (let i = 1; i < 32; i++) {
            days = [...days, { dayNumber: i, hovered: false }];
          }
        } else {
          periods.forEach(({ startDay, endDay }: ISettingsPeriod, periodIndex) => {
            colorIndex = colorIndex === DAY_COLORS.length - 1 ? 0 : colorIndex;

            if (periodIndex === 0 && startDay > 1) {
              for (let i = 1; i < startDay; i++) {
                days = [...days, { dayNumber: i, hovered: false }];
              }
            }

            for (let i = startDay; i <= endDay; i++) {
              days = [
                ...days,
                {
                  dayNumber: i,
                  periodIndex,
                  isFirst: i === startDay,
                  isLast: i === endDay,
                  selected: true,
                  hovered: false,
                  color: DAY_COLORS[colorIndex]
                }
              ];
            }

            if (periodIndex + 1 === periods.length) {
              for (let i = endDay + 1; i < 32; i++) {
                days = [...days, { dayNumber: i, hovered: false }];
              }
            }

            const nextPeriod = periods[periodIndex + 1];

            if (!!nextPeriod && nextPeriod.startDay > endDay + 1) {
              for (let i = endDay + 1; i < nextPeriod.startDay; i++) {
                days = [...days, { dayNumber: i, hovered: false }];
              }
            }

            colorIndex = ++colorIndex;
          });
        }

        ctx.patchState({ periods, days });
      })
    );
  }

  @Action(SetHoveredDay)
  public setHoveredDay(ctx: StateContext<SettingsStateModel>, { hoveredDay }: SetHoveredDay) {
    const { days } = ctx.getState();

    const newDays = produce(days, draft => {
      for (let i = 0; i < draft.length; i++) {
        draft[i].hovered = hoveredDay && hoveredDay === draft[i].dayNumber;
      }
    });

    ctx.patchState({ days: newDays });
  }

  @Action(SelectDay)
  public selectDay(ctx: StateContext<SettingsStateModel>, { day }: SelectDay) {
    const { periods, days } = ctx.getState();

    const newPeriods = produce(periods, draft => {
      if (!periods.length || !!periods[periods.length - 1].endDay) {
        draft.push({ startDay: day, income: [], expense: [] });
      } else {
        let sortedPeriods = [...periods];
        sortedPeriods = sortedPeriods.sort((period, comperedPeriod) => {
          if (period.startDay > comperedPeriod.startDay) {
            return 1;
          } else {
            return -1;
          }
        });

        const latePeriod = sortedPeriods.find(({ startDay }) => startDay > draft[periods.length - 1].startDay);
        let endDay: number;

        if (!!latePeriod && (day > latePeriod.startDay || day < latePeriod.startDay)) {
          endDay = latePeriod.startDay - 1;
        } else if (!latePeriod && day < draft[periods.length - 1].startDay && day >= sortedPeriods[0].startDay) {
          endDay = sortedPeriods[0].startDay - 1;
        } else {
          endDay = day;
        }

        draft[periods.length - 1].endDay = endDay;
      }
    });

    const newDays = produce(days, draft => {
      let colorIndex = 0;

      for (let i = 0; i < draft.length; i++) {
        const period = newPeriods[newPeriods.length - 1];

        if (!period.endDay && draft[i].dayNumber === period.startDay) {
          draft[i] = {
            ...draft[i],
            periodIndex: periods.length - 1,
            isFirst: true,
            isLast: false,
            selected: true,
            hovered: false,
            color: DAY_COLORS[colorIndex]
          };

          return;
        } else if (
          (period.startDay <= period.endDay &&
            draft[i].dayNumber >= period.startDay &&
            draft[i].dayNumber <= period.endDay) ||
          (period.startDay > period.endDay &&
            (draft[i].dayNumber >= period.startDay || draft[i].dayNumber <= period.endDay))
        ) {
          colorIndex = colorIndex === DAY_COLORS.length - 1 ? 0 : colorIndex;

          draft[i] = {
            ...draft[i],
            periodIndex: periods.length - 1,
            isFirst: draft[i].dayNumber === period.startDay,
            isLast: draft[i].dayNumber === period.endDay,
            selected: true,
            hovered: false,
            color: DAY_COLORS[colorIndex]
          };
        }
      }
    });

    ctx.patchState({ periods: newPeriods, days: newDays });
  }
}
