import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HachathonsComponent } from './hachathons.component';

describe('HachathonsComponent', () => {
  let component: HachathonsComponent;
  let fixture: ComponentFixture<HachathonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HachathonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HachathonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
