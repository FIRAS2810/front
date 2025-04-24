import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationTransfertsComponentComponent } from './validation-transferts-component.component';

describe('ValidationTransfertsComponentComponent', () => {
  let component: ValidationTransfertsComponentComponent;
  let fixture: ComponentFixture<ValidationTransfertsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidationTransfertsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationTransfertsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
