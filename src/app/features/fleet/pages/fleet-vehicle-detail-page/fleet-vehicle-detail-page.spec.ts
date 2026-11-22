import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetVehicleDetailPage } from './fleet-vehicle-detail-page';

describe('FleetVehicleDetailPage', () => {
  let component: FleetVehicleDetailPage;
  let fixture: ComponentFixture<FleetVehicleDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetVehicleDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetVehicleDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
