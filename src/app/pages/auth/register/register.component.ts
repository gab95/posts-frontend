import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseFormUser } from '../../../shared/utils/base-form-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    public registerForm: BaseFormUser
  ) {}

  ngOnInit(): void {
    this.excludeProperties();
  }

  onRegister() {
    if (this.registerForm.baseForm.invalid) {
      return;
    }

    const formValue = this.registerForm.baseForm.value;
    this.authService.register(formValue).subscribe((res) => {
      Swal.fire(
        'You are registered!',
        'Now you can login to your account',
        'success'
      );
      this.router.navigate(['/auth/login']);
    });
  }

  checkField(field: string): boolean {
    return this.registerForm.isValidField(field);
  }

  private excludeProperties() {
    this.registerForm.baseForm.get('role').setValidators(null);
    this.registerForm.baseForm.updateValueAndValidity();
  }
}
