import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css'],
})
export class SignInModalComponent implements OnInit {
  signInForm: FormGroup;
  clicked: boolean = false;
  faIcon = faXmarkCircle;
  submitClicked: boolean = false;

  constructor(fb: FormBuilder) {
    this.signInForm = fb.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.minLength(7)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.min(7)]),
      ],
    });
  }

  ngOnInit(): void {}

  onClick(val: boolean): void {
    this.clicked = val;
  }

  onSubmitClicked(): void {
    this.submitClicked = true;
  }
}
