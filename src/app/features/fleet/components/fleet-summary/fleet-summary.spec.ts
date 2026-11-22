import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetSummary } from './fleet-summary';

describe('FleetSummary', () => {
  let component: FleetSummary;
  let fixture: ComponentFixture<FleetSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
