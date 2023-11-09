import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/datas.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

interface IProject {
  id: number;
  name: string;
  image: string;
  title: string;
  technos: string;
  description: string;
  link: string;
  repo_link: string;
  repo_link_back: string;
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
export class RealisationsComponent implements OnInit {
  projectsDatasOc: IProject[] | undefined;
  projectsDatasMap: IProject[] | undefined;
  dataLoaded: boolean = false;

  constructor(private dataService: DataService) {
    this.projectsDatasOc = [];
    this.projectsDatasMap = [];
  }

  ngOnInit() {
    this.dataService.getDatas('oc_datas').subscribe({
      next: (data) => {
        this.projectsDatasOc = data?.reverse();
        this.checkDataLoaded();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de datassites_oc', error);
      },
    });

    this.dataService.getDatas('map_datas').subscribe({
      next: (data) => {
        this.projectsDatasMap = data?.reverse();
        this.checkDataLoaded();
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération de datassites_map',
          error
        );
      },
    });
  }

  private checkDataLoaded() {
    if (this.projectsDatasOc && this.projectsDatasMap) {
      this.dataLoaded = true;
    }
  }
}
