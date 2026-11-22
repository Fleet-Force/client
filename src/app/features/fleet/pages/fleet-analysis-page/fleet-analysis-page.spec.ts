import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetAnalysisPage } from './fleet-analysis-page';

describe('FleetAnalysisPage', () => {
  let component: FleetAnalysisPage;
  let fixture: ComponentFixture<FleetAnalysisPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetAnalysisPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetAnalysisPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
