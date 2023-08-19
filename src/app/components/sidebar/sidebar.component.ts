import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarStateService } from '../../services/sidebar-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  showFiller = false;
  isOpen$: Observable<boolean>; // Déclaration de la variable

  constructor(private sidebarStateService: SidebarStateService) {
    this.isOpen$ = this.sidebarStateService.isOpen$; // Assignation de la valeur de l'Observable
  }

  toggle() {
    this.sidebarStateService.toggle();
  }
}
