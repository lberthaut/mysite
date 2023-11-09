import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bubbles',
  templateUrl: './bubbles.component.html',
  styleUrls: ['./bubbles.component.scss'],
})
export class BubblesComponent implements OnInit {
  bubbles: any[] = [];

  ngOnInit() {
    this.createBubbles();
  }

  createBubbles() {
    const bubblesCount = this.randomNumber(15, 20);
    for (let i = 0; i < bubblesCount; i++) {
      this.bubbles.push({
        size: this.randomNumber(30, 100),
        animationDuration: this.randomNumber(4, 8),
        left: this.randomNumber(0, 100),
        top: this.randomNumber(0, 75),
      });
    }
  }

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
