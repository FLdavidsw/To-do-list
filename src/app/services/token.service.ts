import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  /*
  this variable is a boolean to validate that the localStorage is already defined, 
  it has to be used in the newest angular version (17) as this is bringing problems, 
  especially when getting something from the localStorage
  */
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  
  token: string | null = null;

  constructor() { }
  
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(){
    if (this.isLocalStorageAvailable){
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  removeToken(): void{
    localStorage.removeItem('token');
  }
}
