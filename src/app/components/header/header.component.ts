import { Component } from '@angular/core';
import { SidebarStateService } from '../../services/sidebar-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isSidebarOpen = false;
  isReturning = false;

  constructor(private sidebarStateService: SidebarStateService) {}

  toggleSidebar(event: Event) {
    this.sidebarStateService.toggle();
    event.stopPropagation();
    if (!this.isSidebarOpen) {
      this.isReturning = true;
      setTimeout(() => {
        this.isReturning = false;
      }, 250);
    }
  }

  ngOnInit() {
    this.sidebarStateService.isOpen$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }
}
