import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeReclamationComponent } from './demande-reclamation.component';

describe('DemandeReclamationComponent', () => {
  let component: DemandeReclamationComponent;
  let fixture: ComponentFixture<DemandeReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandeReclamationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
