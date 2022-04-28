import { OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Shell } from '../shell';
import { AlertService } from 'src/app/services/AlertService';
import { HttpService } from 'src/app/services/http/http.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { MatDialog } from '@angular/material/dialog';

export abstract class BaseListComponent implements OnInit {

  abstract get Service(): HttpService;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Route(): Router { return Shell.Injector.get(Router); }
  get MatDialog(): MatDialog { return Shell.Injector.get(MatDialog); }
  @Output() addClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  add(dialog: any, data: any, width = '800px',height?:any) {
    this.openDialog(dialog, data, width,height);
  }
  protected openDialog(dialog: any, data: any, width: any, height?:any): void {
    this.dialog.open(dialog, {
      height,
      width,
      data,
      panelClass: 'my-dialog',
      direction: (this.localize.lang === 'ar' ? 'rtl' : 'ltr'),
      disableClose:true,
      
    });
  }

  openViewDetail(dialog: any, data: any, width = '1100px') {
    this.openDialog(dialog, data, width);
  }

  getErrorMessage(error): string {
    let message = '';

    if (error.status === 400) {

      let errors: Array<any> = error.error.errors;

      if (errors instanceof Object) {
        Object.keys(errors).forEach((key) => {
          message += errors[key][0] + '\n';
        });
      } else if (typeof error.error === 'string') {
        // the error is validation error BadRequest('error message')
        message = error.error;
      } else {
        message = 'Bad Request';
      }

    } else if (error.status === 500) {
      message = 'Unexpected error happened.';
    }

    return message;
  }

}
