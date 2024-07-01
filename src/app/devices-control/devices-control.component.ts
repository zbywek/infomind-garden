import {Component, Inject, OnInit} from '@angular/core';
import {Device, DevicesControlService} from "../services/devices-control.service";
import {UtilsService} from "../services/utils.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import { interval } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-devices-control',
  standalone: true,
  imports: [
    NgForOf,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggle,
    NgIf,
    MatProgressSpinner,
  ],
  templateUrl: './devices-control.component.html',
  styleUrl: './devices-control.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesControlComponent implements OnInit{
  devices: Device[] = [];
  device?: Device;
  buttonLabels: Record<string, string> = {
    'checkHistory': 'Sprawdź historię',
    'modify': 'Modyfikuj',
    'turnOnOff': 'Włącz/Wyłącz'
  }
  initialLoading: boolean = true;

  constructor(
    private devicesControlService: DevicesControlService,
    public dialog : MatDialog,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    this.refreshDevices();
    this.device = this.utilsService.initializeObject<Device>();
  }

  private refreshDevices() {
    interval(2000).pipe(
      switchMap(() => this.devicesControlService.getDevices()),
      catchError(error => {
        console.error('Error during devices data load', error);
        this.initialLoading = false;
        return [];
      })
    ).subscribe((data: Device[]) => {
      this.devices = data;
      this.initialLoading = false;
    });
  }

  getIconPath(iconId: string) {
    return "assets/icons/" + iconId + ".png";
  }

  buttonActions(button: string, device: Device) {
    switch(button) {
      case 'checkHistory':
        this.checkHistoryAction(device);
        break;
      case 'modify':
        this.modifyAction(device);
        break;
      case 'turnOnOff':
        this.turnOnOffAction(device);
        break;
    }
  }

  checkHistoryAction(device: Device) {
    alert('Wykonano akcję: Sprawdź historię: ' + device.deviceName);
  }

  modifyAction(device: Device) {
    const dialogRef = this.dialog.open(DeviceControlDialogComponent, {
      data: {
        id: device.id,
        deviceName: device.deviceName,
        deviceDescription: device.deviceDescription,
        deviceState: device.deviceState,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Current deviceName = ' + device.deviceName + ' => ' + result.deviceName);
      device.deviceName = result.deviceName;
      device.deviceDescription = result.deviceDescription;
      this.devicesControlService.updateDevice(device).subscribe({
        error: () => {
          console.error('Error occurred while updating device');
        },
        next: (device: Device) => {
          this.refreshDevices();
        }
      })
    });
  }

  toggleDeviceStatus(device: Device, event: any) {
    const newStatus = event.checked ? 'ON' : 'OFF';
    this.devicesControlService.updateDevice({ ...device, deviceStatus: newStatus }).subscribe({
      next: updatedDevice => {
        device.deviceStatus = newStatus;
        console.log('Device status updated', updatedDevice);
      },
      error: () => {
        console.log('Error updating device status');
      }
    });
  }

  turnOnOffAction(device: Device) {
    alert('Wykonano akcję: Włącz/Wyłącz');
  }
}

@Component({
  selector: 'app-device-control-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: 'device-control-dialog.component.html',
  styleUrl: 'device-control-dialog.component.scss'
})
export class DeviceControlDialogComponent {

  constructor(
      public dialogRef: MatDialogRef<DeviceControlDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Device
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

/**
 * @title Basic progress-spinner
 */
@Component({
  selector: 'progress-devices-spinner',
  templateUrl: 'progress-devices-spinner.html',
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class ProgressSpinnerOverviewExample {}

