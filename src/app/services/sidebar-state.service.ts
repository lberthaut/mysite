import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarStateService {
  private _isOpen = new BehaviorSubject<boolean>(false);
  isOpen$: Observable<boolean> = this._isOpen.asObservable();

  toggle(forceState?: boolean) {
    if (forceState !== undefined) {
      this._isOpen.next(forceState);
    } else {
      this._isOpen.next(!this._isOpen.value);
    }
  }

  get isOpenValue() {
    return this._isOpen.value;
  }
}
