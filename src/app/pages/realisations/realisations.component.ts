import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-realisations',
  templateUrl: './realisations.component.html',
  styleUrls: ['./realisations.component.scss'],
})
export class RealisationsComponent {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('assets/datas/datassites.json').subscribe((data) => {
      console.log(data);
    });
  }
}
