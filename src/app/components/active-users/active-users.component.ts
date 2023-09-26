import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss'],
})
export class ActiveUsersComponent implements OnInit, OnDestroy {
  publicUser: number = Math.floor(Math.random() * 9420658);
  increaseSubscription: Subscription | null = null;
  decreaseSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.increaseSubscription = interval(this.randomInterval()).subscribe(
      () => {
        this.increasePublic();
      }
    );

    this.decreaseSubscription = interval(this.randomInterval()).subscribe(
      () => {
        this.decreasePublic();
      }
    );
  }

  ngOnDestroy(): void {
    this.increaseSubscription!.unsubscribe();
    this.decreaseSubscription!.unsubscribe();
  }

  randomInterval(): number {
    return Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
  }

  increasePublic(): void {
    let randomnumber = Math.floor(Math.random() * 9000);
    this.publicUser += randomnumber;

    if (this.publicUser <= 0) {
      this.publicUser = 4257868;
    }
  }

  decreasePublic(): void {
    let randomnumber = Math.floor(Math.random() * 9000);
    this.publicUser -= randomnumber;

    if (this.publicUser <= 0) {
      this.publicUser = 854762;
    }
  }
}
