import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  animations: [
    trigger('slideFromRight', [
      state('void', style({ opacity: 0, transform: 'translateX(100%)' })),
      transition('void => *', [animate('1s ease-out')]),
    ]),
  ],
})
export class AccueilComponent implements OnInit {
  showTitle1 = false;
  showTitle2 = false;
  showTitle3 = false;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => (this.showTitle1 = true), 1000);
    setTimeout(() => (this.showTitle2 = true), 2000);
    setTimeout(() => (this.showTitle3 = true), 2500);
  }
}
