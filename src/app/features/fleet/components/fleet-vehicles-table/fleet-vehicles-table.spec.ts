import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetVehiclesTable } from './fleet-vehicles-table';

describe('FleetVehiclesTable', () => {
  let component: FleetVehiclesTable;
  let fixture: ComponentFixture<FleetVehiclesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetVehiclesTable],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetVehiclesTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
