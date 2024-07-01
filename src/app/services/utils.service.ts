import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  initializeObject<T extends object>(): T {
    const initializedObj = {} as T;
    for (const key in initializedObj) {
      if (typeof initializedObj[key] === 'number') {
        initializedObj[key] = 0 as any;
      } else if (typeof initializedObj[key] === 'string') {
        initializedObj[key] = '' as any;
      } else if (typeof initializedObj[key] === 'boolean') {
        initializedObj[key] = false as any;
      } else if (Array.isArray(initializedObj[key])) {
        initializedObj[key] = [] as any;
      } else {
        initializedObj[key] = null as any; // lub {} dla obiektów złożonych
      }
    }
    return initializedObj;
  }
}
