import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {

  constructor() {
  }

  /**
   * Method called to save data in local storage for the given key
   * @param key
   * @param data
   */
  saveData(key: string, data: any): void {
    this.removeData(key);
    localStorage.setItem(key, data);
  }

  /**
   * Method called to get the data for the given key
   * @param key
   */
  getData(key: string): any {
    return localStorage.getItem(key);
  }

  /**
   * Method called to remove the data for the given key
   * @param key
   */
  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Method called for wipe the cache
   */
  clearAllData(): void {
    localStorage.clear();
  }
}
