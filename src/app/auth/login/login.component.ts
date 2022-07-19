import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSpinning = false;
  passwordVisible: false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) { }

  userLogin() {
    this.passwordVisible = false;
    this.isSpinning = true;
    this.auth.signIn(this.loginForm.value, false).then(() => {
      this.loginForm.controls['password'].reset();
      this.isSpinning = false;
    });
  }

  ngOnInit(): void {
    let token = sessionStorage.getItem('token');

    if (token) {
      this.route.navigate(['../../dashboard'])
    }

    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
