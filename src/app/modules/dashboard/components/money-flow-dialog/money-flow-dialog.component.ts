import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { IMoneyFlow } from '../../shared';
import {
  CreateMoneyFlow,
  DashboardState,
  FetchMoneyFlow,
  FetchPeriod,
  MoneyFlowOperationSuccess,
  UpdateMoneyFlow
} from '../../state';

@Component({
  selector: 'app-money-flow-dialog',
  templateUrl: './money-flow-dialog.component.html'
})
export class MoneyFlowDialogComponent implements OnInit, OnDestroy {
  @Select(DashboardState.moneyFlow)
  public moneyFlow$: Observable<IMoneyFlow>;

  public form: FormGroup;
  public isEdit = false;
  public isIncome = false;

  private $unsubscribe: Subject<any> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<MoneyFlowDialogComponent>,
    private builder: FormBuilder,
    private store: Store,
    private actions: Actions,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public ngOnInit() {
    this.isIncome = this.data.isIncome;

    this.form = this.builder.group({
      description: '',
      amount: null
    });

    if (this.data.id) {
      this.isEdit = true;
      this.store.dispatch(new FetchMoneyFlow(this.data.id));
    }

    this.moneyFlow$
      .pipe(
        filter(moneyFlow => !!moneyFlow),
        takeUntil(this.$unsubscribe)
      )
      .subscribe(({ description, amount }) => {
        this.form.get('description').setValue(description);
        this.form.get('amount').setValue(amount);
      });

    this.actions
      .pipe(
        ofActionDispatched(MoneyFlowOperationSuccess),
        takeUntil(this.$unsubscribe)
      )
      .subscribe(() => {
        this.dialogRef.close();
        this.store.dispatch(new FetchPeriod());
      });
  }

  public ngOnDestroy() {
    this.$unsubscribe.next();
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (this.isEdit) {
      this.store.dispatch(new UpdateMoneyFlow({ id: this.data.id, ...this.form.value }, this.isIncome));
    } else {
      this.store.dispatch(new CreateMoneyFlow(this.form.value, this.isIncome));
    }
  }

  public onRemove() {}
}
