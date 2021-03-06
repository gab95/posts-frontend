import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';

import { BaseFormUser } from '../../shared/utils/base-form-user';
import { Profile } from '../../shared/models/user.interface';
import { UtilsService } from '../../shared/service/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: Profile;

  hide = true;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private utilsService: UtilsService,
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

  onUpdate() {
    if (this.profileForm.baseForm.invalid) {
      return;
    }

    const formValue = this.profileForm.baseForm.value;
    this.profileService.updateUserData(formValue).subscribe((res) => {
      Swal.fire(
        'Profile Data Updated!',
        'Login with your new Email & Password',
        'success'
      );
      this.utilsService.openSidebar(false);
      this.authService.logout();
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
