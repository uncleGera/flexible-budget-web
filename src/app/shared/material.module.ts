import { CommonModule } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorIntl,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import { TranslatablePaginator } from './translatable-paginator.service';

const MODULES = [
  CommonModule,
  MatSidenavModule,
  MatCardModule,
  MatMenuModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatProgressBarModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatRadioModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: forwardRef(() => TranslatablePaginator)
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ru'
    }
  ]
})
export class MaterialModule {}
