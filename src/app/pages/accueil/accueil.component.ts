import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
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
export class AccueilComponent implements OnInit, AfterViewInit {
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

  constructor(
    private _formBuilder: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    setTimeout(() => (this.showTitle1 = true), 1000);
    setTimeout(() => (this.showTitle2 = true), 2000);
    setTimeout(() => (this.showTitle3 = true), 2500);
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', () => {
      const card1 = this.el.nativeElement.querySelector('#card1');
      const card2 = this.el.nativeElement.querySelector('#card2');
      const card1Pos = card1.getBoundingClientRect().top;
      const card2Pos = card2.getBoundingClientRect().top;
      const windowPos = window.innerHeight;
      console.log(windowPos);

      if (card1Pos * 1.5 < windowPos && card2Pos * 1.5 < windowPos) {
        this.renderer.addClass(card1, 'show');
        this.renderer.addClass(card2, 'show');
      } else {
        this.renderer.removeClass(card1, 'show');
        this.renderer.removeClass(card2, 'show');
      }
    });
  }
}
