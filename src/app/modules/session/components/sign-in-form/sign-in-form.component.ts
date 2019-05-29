import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ISessionParams } from '../../shared';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent implements OnInit {
  public form: FormGroup;

  @Input()
  public loading: boolean;

  @Output()
  public submitted = new EventEmitter<ISessionParams>();

  constructor(private builder: FormBuilder) {}

  public ngOnInit() {
    this.form = this.builder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted.emit(this.form.value);
  }
}
