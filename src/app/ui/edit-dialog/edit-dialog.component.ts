import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditDialogComponent implements OnInit, AfterViewInit {
  public formControl: FormControl;
  public isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    public element: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public ngOnInit() {
    this.formControl = new FormControl(this.data.value);
  }

  public ngAfterViewInit() {
    this.element.nativeElement.style.display = 'block';
  }

  public onSubmit() {
    this.dialogRef.close(this.formControl.value);
  }
}
