import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokepageComponent } from './pokepage.component';

describe('PokepageComponent', () => {
  let component: PokepageComponent;
  let fixture: ComponentFixture<PokepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokepageComponent]
    });
    fixture = TestBed.createComponent(PokepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
