import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { EditDialogComponent } from '@app/ui/edit-dialog/edit-dialog.component';
import { Subject } from 'rxjs';

@Injectable()
export class EditDialogService {
  public changes$: Subject<any> = new Subject<any>();
  private readonly MOBILE_SCREEN_MAX = 600;

  constructor(private dialog: MatDialog) {}

  public open($event: any, data: any) {
    const rect = $event.target.getBoundingClientRect();
    const config: MatDialogConfig = new MatDialogConfig();

    config.backdropClass = 'edit-dialog__backdrop';
    config.maxWidth = 600;
    config.data = data;

    const dialog = this.dialog.open(EditDialogComponent, config);
    const updateFunc = () => {
      const newRect = $event.target.getBoundingClientRect();
      this.updateSizeEndPosition(dialog, newRect);
    };

    this.updateSizeEndPosition(dialog, rect);

    window.addEventListener('resize', updateFunc);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.changes$.next(result);
      }

      window.removeEventListener('resize', updateFunc);
    });
  }

  private updateSizeEndPosition(dialog: MatDialogRef<EditDialogComponent>, rect: any) {
    const { parentElement } = dialog.componentInstance.element.nativeElement;
    const position = { top: `${rect.y - 4}px`, left: `${rect.x}px` };
    const leftPositionMobile = '18px';
    const leftPositionAdaptive = `${window.innerWidth - parentElement.offsetWidth - 34}px`;
    const widthSizeMobile = `${window.innerWidth - 36}px`;
    let widthSize = 'auto';

    if (window.innerWidth <= this.MOBILE_SCREEN_MAX) {
      widthSize = widthSizeMobile;
      position.left = leftPositionMobile;
    } else if (parentElement.offsetWidth + rect.x > window.innerWidth - 36) {
      position.left = leftPositionAdaptive;
    }

    dialog.updateSize(widthSize);
    dialog.updatePosition(position);
  }
}
