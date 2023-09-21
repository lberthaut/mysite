import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysageComponent } from './paysage.component';

describe('PaysageComponent', () => {
  let component: PaysageComponent;
  let fixture: ComponentFixture<PaysageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaysageComponent]
    });
    fixture = TestBed.createComponent(PaysageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
