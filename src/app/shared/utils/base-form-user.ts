import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private isValidEmail = /\S+@\S+\.\S+/;

  errorMessage = null;

  baseForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(2)]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    role: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  private getErrorMessage(field: string): void {
    let message;
    const { errors } = this.baseForm.get(field);

    if (errors) {
      const minLength = errors?.minlength?.requiredLength;

      const messages = {
        required: 'You must enter a value',
        minlength: `This field must be longer than ${minLength} characters`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }

  isValidField(field: string) {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
      !this.baseForm.get(field).valid
    );
  }
}
