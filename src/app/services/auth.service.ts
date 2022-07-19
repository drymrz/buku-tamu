import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  exactTime = Date();
  userName;
  userRole;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private notif: NzNotificationService,
    private route: Router
  ) { }

  async signIn(userData: any, relog) {
    await this.afAuth
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((res) => {
        if (relog == false) {
          this.notifSuccessLogin()
          this.route.navigate(['../../dashboard']);

        } else {
          this.route.navigate(['../../dashboard']);
          setTimeout(() => {
            this.route.navigate(['../../users/table'])
          }, 250);
        }
        sessionStorage.setItem('token', JSON.stringify(res.user));
        sessionStorage.setItem('email', userData.email);
        return this.afStore
          .collection('/dataUser/' + userData.email + '/lastOnline/')
          .add({
            time: moment(this.exactTime).format('LLLL').toString(),
          });
      })
      .catch((error) => {
        this.notifErrorLogin(error.code);
      });
  }

  patchValue(name, role) {
    this.userName = name;
    this.userRole = role;
  }

  notifSuccessLogin() {
    this.notif.success('Login Berhasil', 'Selamat Datang Kembali');
  }

  notifSuccessRegister() {
    this.notif.success('Register Sukses', 'Berhasil Mendaftarkan User Baru');
  }

  notifErrorRegister(code) {
    if (code === 'auth/email-already-in-use') {
      this.notif.error('Register Error', "Email sudah terpakai !");
    } else if (code === 'auth/weak-password') {
      this.notif.error('Register Error', "Password Terlalu Lemah");
    } else {
      this.notif.error('Register Error', code)
    }
  }

  notifErrorLogin(code) {
    if (code === 'auth/wrong-password') {
      this.notif.error('Login Error', 'Email atau Password Salah');
    } else {
      this.notif.error(
        'Login Error',
        'Akun tidak ditemukan. Cek kembali email anda'
      );
    }
  }

  createAccount(userData) {
    this.afAuth.createUserWithEmailAndPassword(userData.email, userData.password).then(() => {
      let relog = {}

      relog['email'] = sessionStorage.getItem('email');
      relog['password'] = sessionStorage.getItem('relog_pass');

      setTimeout(() => {
        this.afAuth.signOut();
        sessionStorage.clear();
        this.signIn(relog, true);
      }, 500);
      return this.afStore.collection('dataUser').doc(userData.email).set(userData).then(() => {
        this.notifSuccessRegister();
      })

        .catch((error) => {
          this.notifErrorRegister(error.code)
        })
    }).catch((error) => {
      this.notifErrorRegister(error.code)
    })
  }


}
