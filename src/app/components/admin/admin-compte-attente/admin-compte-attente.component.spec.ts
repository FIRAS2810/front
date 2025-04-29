import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompteAttenteComponent } from './admin-compte-attente.component';

describe('AdminCompteAttenteComponent', () => {
  let component: AdminCompteAttenteComponent;
  let fixture: ComponentFixture<AdminCompteAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCompteAttenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCompteAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
