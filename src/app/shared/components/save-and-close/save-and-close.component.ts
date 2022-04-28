import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-save-and-close',
  templateUrl: './save-and-close.component.html',
  styleUrls: ['./save-and-close.component.scss']
})
export class SaveAndCloseComponent implements OnInit {
  @Input() form: any;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClose(form, buttonType) {
    this.close.emit({ form, buttonType });
  }

}
