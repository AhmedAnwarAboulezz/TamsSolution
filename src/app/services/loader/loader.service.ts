import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  showLoader: boolean[] = [];

  constructor() { }

  isLoading = new Subject<boolean>();
  show() {
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false);
  }

  showArray(){
    
    this.showLoader.push(true);
    this.show();
  }
  hideArray(){
    
    this.showLoader.pop();
    if(this.showLoader.length == 0){
       this.hide();
    }
  }


}
