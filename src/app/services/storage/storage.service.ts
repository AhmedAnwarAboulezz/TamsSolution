import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  setItem(key: string, value: string) {
    return of(localStorage.setItem(key, value));
  }

  getItem(key: string) {
    return of(localStorage.getItem(key));
  }
  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  get(key: string) {
    return localStorage.getItem(key);
  }

  getUserData(key: string) {
    return localStorage.getItem(key);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearStorage() {
    return of(localStorage.clear());
  }

  removeStorgeByKey(key) {
    localStorage.removeItem(key);
  }
  isExist(key: string): boolean {
    return localStorage.getItem(key) !== null
  }
}
