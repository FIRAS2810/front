import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionSmbsaComponent } from './description-smbsa.component';

describe('DescriptionSmbsaComponent', () => {
  let component: DescriptionSmbsaComponent;
  let fixture: ComponentFixture<DescriptionSmbsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionSmbsaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionSmbsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
