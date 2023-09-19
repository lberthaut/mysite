import { Component, ElementRef, HostListener } from '@angular/core';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { Router } from '@angular/router';
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
      state('active', style({ backgroundColor: '#D2E9E9' })),
      state('inactive', style({ backgroundColor: 'transparent' })),
      transition('inactive <=> active', animate('0.25s ease-out')),
    ]),
  ],
})
export class SidebarComponent {
  isOpen$: Observable<boolean>;
  hoveredLinkContainer: string | null = null;
  hoveredLink: string | null = null;

  linkName: { link: string; value: string }[] = [
    { link: 'realisations', value: 'Réalisations' },
    { link: 'professional', value: 'Parcours Professionnel' },
    { link: 'scholar', value: 'Parcours Scolaire' },
    { link: 'aboutme', value: 'A propos de moi' },
  ];

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.sidebarStateService.isOpenValue) {
      const clickedInside = this.elementRef.nativeElement.contains(
        event.target
      );
      if (!clickedInside) {
        this.sidebarStateService.toggle(false);
      }
    }
  }

  constructor(
    private elementRef: ElementRef,
    private sidebarStateService: SidebarStateService,
    private router: Router
  ) {
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

  onLinkClick(link: { link: string; value: string }) {
    this.sidebarStateService.toggle();
    this.router.navigate([link.link]);
  }
}
