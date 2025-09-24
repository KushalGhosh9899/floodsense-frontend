import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactedAreas } from './impacted-areas';

describe('ImpactedAreas', () => {
  let component: ImpactedAreas;
  let fixture: ComponentFixture<ImpactedAreas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpactedAreas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpactedAreas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
