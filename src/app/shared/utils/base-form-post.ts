import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class BaseFormPost {
  errorMessage = null;

  baseForm = this.fb.group({
    image: ['Select File', Validators.required],
    caption: ['', [Validators.required, Validators.minLength(3)]],
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
