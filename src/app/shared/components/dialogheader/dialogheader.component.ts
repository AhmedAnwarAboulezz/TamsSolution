import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialogheader',
  templateUrl: './dialogheader.component.html',
  styleUrls: ['./dialogheader.component.scss']
})
export class DialogheaderComponent implements OnInit {
  @Input() text: string;
  @Output() onclick: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
    
  }
  onNoClick() {
    this.onclick.emit();
  }

}
