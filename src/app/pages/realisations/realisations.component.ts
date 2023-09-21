import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

interface IProject {
  id: string;
  name: string;
  image: string;
  title: string;
  technos: string;
  description: string;
  link: string;
  repo_link: string;
}

@Component({
  selector: 'app-realisations',
  templateUrl: './realisations.component.html',
  styleUrls: ['./realisations.component.scss'],
  animations: [
    trigger('slideFromRight', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(250),
      ]),
      transition('* => void', [
        animate(250, style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class RealisationsComponent {
  projectsDatas: IProject[];

  constructor(private http: HttpClient) {
    this.projectsDatas = [];
  }

  ngOnInit() {
    this.http
      .get<IProject[]>('assets/datas/datassites.json')
      .subscribe((data) => {
        this.projectsDatas = data;
      });
  }
}
