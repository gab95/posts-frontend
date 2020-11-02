import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from './shared/service/utils.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private destroy$ = new Subject<any>();

  opened = false;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.utilsService.sidebarOpened$
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: boolean) => (this.opened = resp));
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
