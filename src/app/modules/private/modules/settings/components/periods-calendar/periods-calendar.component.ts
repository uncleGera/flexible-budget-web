import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ISettingsDay } from '../../shared';

@Component({
  selector: 'app-periods-calendar',
  templateUrl: './periods-calendar.component.html',
  styleUrls: ['./periods-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodsCalendarComponent {
  @Input()
  public days: ISettingsDay[];

  @Output()
  public hoverActivated: EventEmitter<ISettingsDay> = new EventEmitter();

  @Output()
  public daySelected: EventEmitter<ISettingsDay> = new EventEmitter();

  public dayClassNames(day: ISettingsDay): { [className: string]: boolean } {
    return {
      'calendar__day': true,
      'calendar__day_selected': day.selected,
      'calendar__day_first' : day.isFirst,
      'calendar__day_last' : day.isLast,
      'filled' : day.filled,
      'hover' : day.hover
    };
  }

  public setHover(day: ISettingsDay) {
    this.hoverActivated.emit(day);
  }

  public onDaySelected(day: ISettingsDay) {
    this.daySelected.emit(day);
  }
}
