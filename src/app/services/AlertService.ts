import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LocalizationService } from './localization/localization.service';
import { Shell } from '../component/shell';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  constructor(private alert: MatSnackBar, private toastr: ToastrService) 
  {
    //this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
    this.toastr.toastrConfig.titleClass = 'toast-title-message';
    this.toastr.toastrConfig.messageClass = 'toast-title-message';
    this.toastr.toastrConfig.timeOut = 5000;
    this.toastr.toastrConfig.extendedTimeOut = 4000;    
   }

  openAlert(message: string) {
    this.alert.open(this.localize.translate.instant(message) , '', {
      duration: 8 * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      direction: this.localize.translate.instant('dir')
    });
  }

  showSuccess(message) {
    this.toastr.success(message);
  }
  showError(error) {
    this.toastr.error(error);
  }
  showInformation(message) {
    this.toastr.info(message);
  }

 
}