import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageComponentComponent } from './parametrage-component.component';

describe('ParametrageComponentComponent', () => {
  let component: ParametrageComponentComponent;
  let fixture: ComponentFixture<ParametrageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametrageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
