import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesControlComponent } from './devices-control.component';

describe('DevicesControlComponent', () => {
  let component: DevicesControlComponent;
  let fixture: ComponentFixture<DevicesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicesControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
