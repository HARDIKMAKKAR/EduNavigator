import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerEnggComponent } from './computer-engg.component';

describe('ComputerEnggComponent', () => {
  let component: ComputerEnggComponent;
  let fixture: ComponentFixture<ComputerEnggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComputerEnggComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerEnggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
