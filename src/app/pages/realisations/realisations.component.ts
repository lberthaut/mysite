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
  projectsDatasOc: IProject[] | undefined;
  projectsDatasMap: IProject[] | undefined;
  dataLoaded: boolean = false;

  constructor(private http: HttpClient) {
    this.projectsDatasOc = [];
    this.projectsDatasMap = [];
  }

  ngOnInit() {
    Promise.all([
      this.http.get<IProject[]>('assets/datas/datassites_oc.json').toPromise(),
      this.http.get<IProject[]>('assets/datas/datassites_map.json').toPromise(),
    ]).then(([dataOc, dataMap]) => {
      this.projectsDatasOc = dataOc?.reverse();
      this.projectsDatasMap = dataMap?.reverse();
      this.dataLoaded = true;
    });
  }
}
