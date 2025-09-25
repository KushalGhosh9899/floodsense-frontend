import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloodAnalysis } from './flood-analysis';

describe('FloodAnalysis', () => {
  let component: FloodAnalysis;
  let fixture: ComponentFixture<FloodAnalysis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloodAnalysis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloodAnalysis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
