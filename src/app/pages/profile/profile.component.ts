import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';

import { BaseFormUser } from '../../shared/utils/base-form-user';
import { Profile } from '../../shared/models/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: Profile;

  hide = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    public profileForm: BaseFormUser
  ) {}

  ngOnInit(): void {
    this.excludeProperties();
    this.profileForm.baseForm.reset();
    this.getUserData();
  }

  getUserData() {
    this.profileService.getUserData().subscribe((resp: Profile) => {
      this.userData = resp;
      this.profileForm.baseForm.patchValue(this.userData);
    });
  }

  onRegister() {
    if (this.profileForm.baseForm.invalid) {
      return;
    }

    const formValue = this.profileForm.baseForm.value;
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
    return this.profileForm.isValidField(field);
  }

  private excludeProperties() {
    this.profileForm.baseForm.get('role').setValidators(null);
    this.profileForm.baseForm.updateValueAndValidity();
  }
}
