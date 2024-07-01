import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Device {
  id: number
  iconId: string
  deviceName: string
  deviceDescription: string
  deviceState: string
  deviceStatus: string
  availableButtons: string[]
}

@Injectable({
  providedIn: 'root'
})
export class DevicesControlService {

  url = 'https://garden-json-server-d134f4c8a935.herokuapp.com/device';

  constructor(
    private http: HttpClient
  ) { }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.url);
  }

  updateDevice(device: Device): Observable<Device> {
      return this.http.put<Device>(`${this.url}/${device.id}`, device);
  }
}
