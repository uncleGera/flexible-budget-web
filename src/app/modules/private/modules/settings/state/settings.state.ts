import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs/operators';

import { ISettingsDay, ISettingsPeriod, SettingsService } from '../shared';
import { FetchPeriod, SelectDay, SelectPeriod, SetHover } from './settings.actions';
import { SettingsStateModel } from './settings.model';

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    periods: [],
    selectedPeriod: null,
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
    return days;
  }

  @Selector()
  public static selectedPeriod({ selectedPeriod }: SettingsStateModel): ISettingsPeriod {
    return selectedPeriod;
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
            days = [...days, { dayNumber: i }];
          }
        } else {
          periods.forEach(({ startDay, endDay }: ISettingsPeriod, periodIndex) => {
            if (periodIndex === 0 && startDay > 1) {
              for (let i = 1; i < startDay; i++) {
                days = [...days, { dayNumber: i }];
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
                  selected: true
                }
              ];
            }

            if (periodIndex + 1 === periods.length) {
              for (let i = endDay + 1; i < 32; i++) {
                days = [...days, { dayNumber: i }];
              }
            }

            const nextPeriod = periods[periodIndex + 1];

            if (!!nextPeriod && nextPeriod.startDay > endDay + 1) {
              for (let i = endDay + 1; i < nextPeriod.startDay; i++) {
                days = [...days, { dayNumber: i }];
              }
            }

            colorIndex = ++colorIndex;
          });
        }

        ctx.patchState({ periods, days });
      })
    );
  }

  @Action(SetHover)
  public setHover(ctx: StateContext<SettingsStateModel>, { day }: SetHover) {
    const { days, periods } = ctx.getState();

    const newDays = produce(days, draft => {
      const lastPeriod = periods[periods.length - 1];
      const uncompletedPeriod = lastPeriod && !lastPeriod.endDay ? lastPeriod : null;

      for (let i = 0; i < draft.length; i++) {
        if (day && !uncompletedPeriod) {
          const filled =
            ((day.periodIndex === 0 || !!day.periodIndex) && day.periodIndex === draft[i].periodIndex) ||
            day.dayNumber === draft[i].dayNumber;

          draft[i].filled = filled;
        }

        if (day && uncompletedPeriod) {
          let sortedPeriods = [...periods];
          sortedPeriods = sortedPeriods.sort((period, comparedPeriod) =>
            period.startDay > comparedPeriod.startDay ? 1 : -1
          );

          const latePeriod = sortedPeriods.find(({ startDay }) => startDay > uncompletedPeriod.startDay);

          let filled: boolean;
          let isLast: boolean;

          if (latePeriod && day.dayNumber > uncompletedPeriod.startDay) {
            filled =
              draft[i].dayNumber > uncompletedPeriod.startDay &&
              draft[i].dayNumber <= day.dayNumber &&
              draft[i].dayNumber < latePeriod.startDay;

            isLast =
              day.dayNumber === draft[i].dayNumber ||
              (draft[i].dayNumber === latePeriod.startDay - 1 && day.dayNumber >= latePeriod.startDay);
          } else if (latePeriod && day.dayNumber < uncompletedPeriod.startDay) {
            filled = draft[i].dayNumber > uncompletedPeriod.startDay && draft[i].dayNumber < latePeriod.startDay;

            isLast =
              day.dayNumber === draft[i].dayNumber ||
              (draft[i].dayNumber === latePeriod.startDay - 1 && day.dayNumber < uncompletedPeriod.startDay);
          } else if (day.dayNumber < uncompletedPeriod.startDay) {
            filled =
              draft[i].dayNumber > uncompletedPeriod.startDay ||
              (draft[i].dayNumber < sortedPeriods[0].startDay && draft[i].dayNumber <= day.dayNumber);
            isLast = day.dayNumber === draft[i].dayNumber;
          } else {
            filled = draft[i].dayNumber > uncompletedPeriod.startDay && draft[i].dayNumber <= day.dayNumber;
            isLast = day.dayNumber === draft[i].dayNumber;
          }

          draft[i].filled = filled;

          if (filled) {
            draft[i].isLast = isLast;
          }
        }

        if (day && !day.selected) {
          draft[i].hover = !uncompletedPeriod && day.dayNumber === draft[i].dayNumber;
        }
      }
    });

    ctx.patchState({ days: newDays });
  }

  @Action(SelectDay)
  public selectDay(ctx: StateContext<SettingsStateModel>, { day }: SelectDay) {
    const { periods, days } = ctx.getState();

    if (day.selected) {
      ctx.dispatch(new SelectPeriod(periods[day.periodIndex]));
    }

    if (day.selected && !!periods.length && !!periods[periods.length - 1].endDay) {
      return;
    }

    const newPeriods = produce(periods, draft => {
      if (!periods.length || (!!periods.length && !!periods[periods.length - 1].endDay)) {
        draft.push({
          startDay: day.dayNumber,
          income: [],
          expense: []
        });
      } else {
        let sortedPeriods = [...periods];
        sortedPeriods = sortedPeriods.sort((period, comparedPeriod) =>
          period.startDay > comparedPeriod.startDay ? 1 : -1
        );

        const latePeriod = sortedPeriods.find(({ startDay }) => startDay > draft[periods.length - 1].startDay);
        let endDay: number;

        if (
          !!latePeriod &&
          (day.dayNumber >= latePeriod.startDay ||
            (day.dayNumber < draft[periods.length - 1].startDay && day.dayNumber < latePeriod.startDay))
        ) {
          endDay = latePeriod.startDay - 1;
        } else if (
          !latePeriod &&
          day.dayNumber < draft[periods.length - 1].startDay &&
          day.dayNumber >= sortedPeriods[0].startDay
        ) {
          endDay = sortedPeriods[0].startDay - 1;
        } else {
          endDay = day.dayNumber;
        }

        draft[periods.length - 1].endDay = endDay;
      }
    });

    const newDays = produce(days, draft => {
      for (let i = 0; i < draft.length; i++) {
        const period = newPeriods[newPeriods.length - 1];

        if (!period.endDay && draft[i].dayNumber === period.startDay) {
          draft[i] = {
            ...draft[i],
            periodIndex: newPeriods.length - 1,
            isFirst: true,
            isLast: false,
            selected: true
          };

          return;
        } else if (
          (period.startDay <= period.endDay &&
            draft[i].dayNumber >= period.startDay &&
            draft[i].dayNumber <= period.endDay) ||
          (period.startDay > period.endDay &&
            (draft[i].dayNumber >= period.startDay || draft[i].dayNumber <= period.endDay))
        ) {
          draft[i] = {
            ...draft[i],
            periodIndex: newPeriods.length - 1,
            isFirst: draft[i].dayNumber === period.startDay,
            isLast: draft[i].dayNumber === period.endDay,
            selected: true
          };
        }
      }
    });

    ctx.patchState({ periods: newPeriods, days: newDays });
  }

  @Action(SelectPeriod)
  public selectPeriod(ctx: StateContext<SettingsStateModel>, { selectedPeriod }: SelectPeriod) {
    ctx.patchState({ selectedPeriod });
  }
}
