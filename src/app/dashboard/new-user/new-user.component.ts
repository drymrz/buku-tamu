import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  isSpinning = false;
  uPass;
  todayDate = Date();


  registerForm: FormGroup;

  submitForm(): void {
    let Record = {};

    Record['email'] = this.registerForm.controls['email'].value;
    Record['fullName'] = this.registerForm.controls['fullName'].value;
    Record['jabatan'] = this.registerForm.controls['jabatan'].value;
    Record['password'] = this.registerForm.controls['password'].value;
    Record['role'] = this.registerForm.controls['acLevel'].value;
    Record['dateCreated'] = moment(this.todayDate).format('DD-MM-YYYY').toString();
    Record['createdBy'] = sessionStorage.getItem('usn');
    this.api.createAccount(Record);
    this.registerForm.reset();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.registerForm.reset();
    for (const key in this.registerForm.controls) {
      if (this.registerForm.controls.hasOwnProperty(key)) {
        this.registerForm.controls[key].markAsPristine();
        this.registerForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.registerForm.controls.confirm.updateValueAndValidity()
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: FormBuilder, private api: AuthService, private afAuth: AngularFireAuth) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required], [this.userNameAsyncValidator]],
      jabatan: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [this.confirmValidator]],
      acLevel: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.uPass = sessionStorage.getItem('pwd');

    sessionStorage.setItem('relog_pass', this.uPass);
  }
}
