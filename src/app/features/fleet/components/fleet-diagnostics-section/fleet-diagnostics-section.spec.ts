import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetDiagnosticsSection } from './fleet-diagnostics-section';

describe('FleetDiagnosticsSection', () => {
  let component: FleetDiagnosticsSection;
  let fixture: ComponentFixture<FleetDiagnosticsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetDiagnosticsSection],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetDiagnosticsSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
