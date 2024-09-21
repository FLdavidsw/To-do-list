import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  /*
  this variable is a boolean to validate that the localStorage is already defined, 
  it has to be used in the newest angular version (17) as this is bringing problems, 
  especially when getting something from the localStorage
  */
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  constructor() { }

  getItem(key: string): any {
    let element: any;
    if(this.isLocalStorageAvailable){
      element = localStorage.getItem(key);
    }
    return element ? JSON.parse(element) : null;
  }

  setItem(key: string, data: any): void {
    if(this.isLocalStorageAvailable){
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  updateItem(key: string, newData: any): void {
    const existingData = this.getItem(key);
    if (existingData) {
      const updatedData = { ...existingData, ...newData };
      this.setItem(key, updatedData);
    }
  }
}
