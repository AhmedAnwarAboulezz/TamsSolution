
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { BaseComponent } from 'src/app/component/BaseComponent';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangepasswordComponent  extends BaseComponent implements OnInit {
  minPw = 8;
  match=false;
  form: FormGroup;
  constructor(
    private fb: FormBuilder, private authenticationService: AuthService,
  ) {
    super();
   }
  showDetails: boolean;

  color = '';

  ngOnInit( ) {

    this.initForm();

  }

  initForm() {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required,  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')  ]  ],
      passwordConfirmationFormControl: ['', Validators.required]

    });
  }
  onStrengthChanged(strength: number) {

  }

  changepassword() {

    this.service.post(this.APIs.init('Users').ChangePassword, this.form.value)

    .subscribe(res => {

       this.alertService.showSuccess(`Password Changed successfully`);
    }, err => {

      this.alertService.showError('Incorrect password, please enter valid password');
    });
  }

   /* Called on each input in either password field */
   onPasswordInput(pass1:string,pass2:string) {

     if (pass1==pass2)
      this.match=true;
      else
      this.match=false;

       if ( this.match==false)
         this.form.controls['passwordConfirmationFormControl']. setErrors([{'match': true}]);
         else
        this.form.setErrors(null);

   }

}

