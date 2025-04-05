import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerRoadmapFormComponent } from './career-roadmap-form.component';

describe('CareerRoadmapFormComponent', () => {
  let component: CareerRoadmapFormComponent;
  let fixture: ComponentFixture<CareerRoadmapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareerRoadmapFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerRoadmapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
