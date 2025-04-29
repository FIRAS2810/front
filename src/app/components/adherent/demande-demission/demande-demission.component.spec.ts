import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDemissionComponent } from './demande-demission.component';

describe('DemandeDemissionComponent', () => {
  let component: DemandeDemissionComponent;
  let fixture: ComponentFixture<DemandeDemissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandeDemissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeDemissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
