import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private sidebarOpened = new BehaviorSubject<boolean>(false);

  sidebarOpened$ = this.sidebarOpened.asObservable();

  openSidebar(value: boolean): void {
    this.sidebarOpened.next(value);
  }
}
