import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IMoneyFlow } from 'libs/interfaces';

@Component({
  selector: 'app-money-flow-dialog',
  templateUrl: './money-flow-dialog.component.html'
})
export class MoneyFlowDialogComponent implements OnInit {
  public form: FormGroup;
  public isEdit = false;

  constructor(
    public dialogRef: MatDialogRef<MoneyFlowDialogComponent>,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IMoneyFlow
  ) {}

  public ngOnInit() {
    this.isEdit = !!this.data.id;
    this.form = this.builder.group({
      description: this.data.description || '',
      amount: this.data.amount || null
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const moneyFlow = this.form.value;
    if (this.data.kind) {
      moneyFlow.kind = this.data.kind;
    }
    if (this.data.id) {
      moneyFlow.id = this.data.id;
    }

    this.dialogRef.close(moneyFlow);
  }

  public kind(): string {
    return this.data.kind === 'income' ? 'дохода' : 'расхода';
  }
}
