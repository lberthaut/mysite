import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prefooter',
  templateUrl: './prefooter.component.html',
  styleUrls: ['./prefooter.component.scss'],
})
export class PrefooterComponent {
  linkName: { link: string; value: string }[] = [
    { link: '', value: 'Accueil' },
    { link: 'realisations', value: 'Réalisations' },
    { link: 'professional', value: 'Parcours Professionnel' },
    { link: 'scholar', value: 'Parcours Scolaire' },
    { link: 'aboutme', value: 'A propos de moi' },
  ];

  contactName: { icon: string; value: string }[] = [
    { icon: 'mail', value: 'louis.berthaut@gmx.com' },
    { icon: 'phone', value: '06.68.94.94.01.' },
    {
      icon: 'linkedin',
      value: 'https://www.linkedin.com/in/louis-berthaut-21a066231/',
    },
  ];

  constructor(private router: Router) {}

  onLinkClick(link: { link: string; value: string }) {
    this.router.navigate([link.link]);
    window.scrollTo(0, 0);
  }
}
