import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetImportPage } from './fleet-import-page';

describe('FleetImportPage', () => {
  let component: FleetImportPage;
  let fixture: ComponentFixture<FleetImportPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetImportPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetImportPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
