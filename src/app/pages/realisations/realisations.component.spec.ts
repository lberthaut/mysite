import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisationsComponent } from './realisations.component';

describe('RealisationsComponent', () => {
  let component: RealisationsComponent;
  let fixture: ComponentFixture<RealisationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealisationsComponent]
    });
    fixture = TestBed.createComponent(RealisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
