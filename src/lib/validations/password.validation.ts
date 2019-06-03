import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
  public static MatchPassword(control: AbstractControl) {
    const passwordConfirmation = control.get('passwordConfirmation');
    const password = control.get('password').value;
    const confirmPassword = passwordConfirmation.value;
    const match = password === confirmPassword;
    passwordConfirmation.setErrors({ matchPassword: !match });

    if (match) {
      passwordConfirmation.setErrors(null);
    }
    return match;
  }
}
