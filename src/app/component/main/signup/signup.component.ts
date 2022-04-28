import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BaseComponent } from '../../BaseComponent';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BaseComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthService,

  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
    this.OrganizationsData();
  }

  OrganizationsData() {
    this.service.OrganizationsData$.subscribe(res => {

    });
  }

  initForm() {
    this.form = this.fb.group({
      employeeNo: ['', Validators.required],
      civilId: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signUp() {
    this.authenticationService.signUp(this.form.value).subscribe(res => {
      this.alertService.showSuccess(`User Saved successfully`);

    });
  }
}