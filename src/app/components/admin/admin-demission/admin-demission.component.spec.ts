import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDemissionComponent } from './admin-demission.component';

describe('AdminDemissionComponent', () => {
  let component: AdminDemissionComponent;
  let fixture: ComponentFixture<AdminDemissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDemissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDemissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
