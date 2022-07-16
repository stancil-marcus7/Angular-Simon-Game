import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { OpenSignInModalService } from '../services/behavior-subject-services/sign-in.service';
import { UserHTTPService } from '../services/user-http.service';
import { UserService } from '../services/behavior-subject-services/user.service';
import { ComparePassword } from 'src/custom-validators/sign-in-modal-validators';

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
    private signInService: OpenSignInModalService,
    private userHttpService: UserHTTPService,
    private userService: UserService
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
    this.userHttpService
      .loginUser({
        username: this.signInForm.controls['email'].value,
        password: this.signInForm.controls['password'].value,
      })
      ?.subscribe((user) => {
        console.log(user);
        this.userService.setUser(user);
        this.signInService.openSignInModal('slideOut');
        _.delay(() => {
          this.signInService.openSignInModal('');
        }, 500);
      });

    console.log(this.signInForm.controls['password'].errors);
    console.log(this.signUpForm.controls['password'].errors);
    console.log(this.signUpForm.controls['reTypePassword'].errors);
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
    if (this.signUpForm.controls['reTypePassword'].errors) {
      return true;
    }
    return false;
  }
}
