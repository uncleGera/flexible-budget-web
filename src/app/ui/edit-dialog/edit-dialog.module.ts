import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { EditDialogComponent } from './edit-dialog.component';
import { EditDialogService } from './edit-dialog.service';

@NgModule({
  imports: [SharedModule],
  exports: [EditDialogComponent],
  declarations: [EditDialogComponent],
  entryComponents: [EditDialogComponent],
  providers: [EditDialogService]
})
export class EditDialogModule {}
