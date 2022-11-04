import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { SignInModalService } from '../services/behavior-subject-services/sign-in-modal.service';
import { UserHTTPService } from '../services/user-http.service';
import { ComparePassword } from 'src/custom-validators/sign-in-modal-validators';
import * as moment from 'moment';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css'],
})
export class SignInModalComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  signUpForm: FormGroup;
  clicked: string = '';
  faIcon = faXmarkCircle;
  submitClicked: boolean = false;
  signUp: boolean = false;
  subscription: any;
  signUpEmail: string = '';
  signUpPassword: string = '';
  signInEmail: string = '';
  signInPassword: string = '';
  hideSignInPassword: boolean = true;
  hideSignUpPassword: boolean = true;

  constructor(
    fb: FormBuilder,
    private signInService: SignInModalService,
    private userHttpService: UserHTTPService
  ) {
    this.signInForm = fb.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.minLength(7)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(7)]),
      ],
    });
    this.signUpForm = fb.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.minLength(7)]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.min(7)]),
        ],
        reTypePassword: [
          '',
          Validators.compose([Validators.required, Validators.min(7)]),
        ],
      },
      {
        // Used custom form validator name
        validator: ComparePassword('password', 'reTypePassword'),
      }
    );
  }

  ngOnInit(): void {
    this.subscription = this.signInService.data.subscribe((message) => {
      this.clicked = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick(): void {
    this.signInService.openSignInModal('slideOut');
    _.delay(() => {
      this.signInService.openSignInModal('');
    }, 500);
  }

  async onSubmitClicked(): Promise<void> {
    this.submitClicked = true;
    if (!this.signUp) {
      this.userHttpService.getToken({
        username: this.signInForm.controls['email'].value,
        password: this.signInForm.controls['password'].value,
      });
      console.log(this.signInForm.controls['password'].errors);
      console.log(this.signUpForm.controls['password'].errors);
      console.log(this.signUpForm.controls['reTypePassword'].errors);
    } else {
      this.userHttpService.createUser({
        username: this.signUpForm.controls['email'].value,
        password: this.signUpForm.controls['password'].value,
      });
    }
  }

  toggleSignInForm(): void {
    this.signUp = !this.signUp;
  }

  get signInEmailError() {
    return this.signInForm.controls['email'].errors;
  }

  get signInEmailPassword() {
    return this.submitClicked && this.signInForm.controls['password'].errors;
  }

  toggleHideSignInPassword() {
    this.hideSignInPassword = !this.hideSignInPassword;
  }

  toggleHideSignUpPassword() {
    this.hideSignUpPassword = !this.hideSignUpPassword;
  }

  get signUpModalReTypePasswordErrors() {
    if (this.signUpForm.controls['reTypePassword'].errors && this.signUp) {
      return true;
    }
    return false;
  }
}
