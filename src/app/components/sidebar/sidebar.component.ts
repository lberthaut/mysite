import { Component } from '@angular/core';
import { SidebarStateService } from '../../services/sidebar-state.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('linkContainerHover', [
      state('active', style({ backgroundColor: '#3b3b3b' })),
      state('inactive', style({ backgroundColor: 'transparent' })),
      transition('inactive <=> active', animate('0.25s ease-out')),
    ]),
    trigger('linkHover', [
      state('active', style({ marginLeft: '20px' })),
      state('inactive', style({ marginLeft: '0' })),
      transition('inactive => active', animate('0.25s ease-out')),
    ]),
  ],
})
export class SidebarComponent {
  showFiller: boolean = false;
  isOpen$: Observable<boolean>;
  hoveredLinkContainer: string | null = null;
  hoveredLink: string | null = null;

  linkName: { link: string; value: string }[] = [
    { link: 'realisations', value: 'Réalisations' },
    { link: 'professional', value: 'Parcours Professionnel' },
    { link: 'scholar', value: 'Parcours Scolaire' },
    { link: 'aboutme', value: 'A propos de moi' },
  ];

  constructor(private sidebarStateService: SidebarStateService) {
    this.isOpen$ = this.sidebarStateService.isOpen$;
  }

  toggle() {
    this.sidebarStateService.toggle();
  }

  onMouseOver(link: { link: string; value: string }) {
    this.hoveredLink = link.link;
    this.hoveredLinkContainer = link.link;
  }

  onMouseLeave() {
    this.hoveredLink = null;
    this.hoveredLinkContainer = null;
  }
}
