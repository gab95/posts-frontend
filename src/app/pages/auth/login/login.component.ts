import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseFormUser } from '../../../shared/utils/base-form-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    public loginForm: BaseFormUser
  ) {}

  ngOnInit(): void {
    this.loginForm.baseForm.reset();
    this.excludeProperties();
  }

  onLogin() {
    if (this.loginForm.baseForm.invalid) return;

    const formValue = this.loginForm.baseForm.value;

    this.authService.login(formValue).subscribe((res) => {
      this.router.navigate(['/home']);
    });
  }

  checkField(field: string): boolean {
    return this.loginForm.isValidField(field);
  }

  excludeProperties() {
    this.loginForm.baseForm.get('role').setValidators(null);
    this.loginForm.baseForm.get('name').setValidators(null);
    this.loginForm.baseForm.get('lastname').setValidators(null);
    this.loginForm.baseForm.updateValueAndValidity();
  }
}
