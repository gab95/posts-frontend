import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../pages/auth/auth.service';
import { UtilsService } from '../../service/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {}

  onExit() {
    this.utilsService.openSidebar(false);
    this.authService.logout();
  }
}
