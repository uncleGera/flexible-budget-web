import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '@lib/validations';

import { ISessionParams } from '../../shared';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent implements OnInit {
  public readonly MIN_PASSWORD_LENGTH = 6;

  public form: FormGroup;

  @Input()
  public loading: boolean;

  @Output()
  public submitted = new EventEmitter<ISessionParams>();

  constructor(private builder: FormBuilder) {}

  public ngOnInit() {
    this.form = this.builder.group(
      {
        email: [null, Validators.email],
        password: [null, [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]],
        passwordConfirmation: null
      },
      {
        validator: PasswordValidation.MatchPassword
      }
    );
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const params = this.form.value;
    delete params.passwordConfirmation;

    this.submitted.emit(this.form.value);
  }
}
