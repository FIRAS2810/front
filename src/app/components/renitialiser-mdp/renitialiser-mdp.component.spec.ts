import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenitialiserMdpComponent } from './renitialiser-mdp.component';

describe('RenitialiserMdpComponent', () => {
  let component: RenitialiserMdpComponent;
  let fixture: ComponentFixture<RenitialiserMdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenitialiserMdpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenitialiserMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
