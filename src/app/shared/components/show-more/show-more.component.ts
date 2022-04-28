import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.scss']
})
export class ShowMoreComponent implements OnInit {
  @Input() textValue: any;
  showMoreButton:boolean = false;
  showLessButton:boolean = false;

  // @Input() serviceName : any;
  constructor() { }

  ngOnInit() {
    if(this.textValue == null || this.textValue == '' || this.textValue.length < 30){
      this.showMoreButton = false;
    }
    else{
      this.showMoreButton = true;
    }  
  }

  clickButton(type:string){
    if(type == 'show'){
      this.showMoreButton = false;
      this.showLessButton = true;

    }
    else{
      this.showMoreButton = true;
      this.showLessButton = false;
    }
  }

}
