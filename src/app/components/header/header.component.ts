import { Component } from '@angular/core';
import { SidebarStateService } from '../../services/sidebar-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private sidebarStateService: SidebarStateService) {}

  toggleSidebar() {
    this.sidebarStateService.toggle();
  }
}
