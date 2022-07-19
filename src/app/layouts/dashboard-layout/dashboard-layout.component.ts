import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  isMobileView = false;
  windowWidth;
  isCollapsed = false;
  isRoute = '-';
  userName;
  userPass;
  userRole = 'user';

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.afa.authState.subscribe((user) => {
      if (user) {
        let emailLower = user.email.toLowerCase();
        this.afs
          .collection('dataUser')
          .doc(emailLower)
          .snapshotChanges()
          .subscribe((data) => {
            let userName = data.payload.data()['fullName'];
            let userRole = data.payload.data()['role'];
            let userPwd = data.payload.data()['password'];
            this.setUserData(userName, userRole, userPwd);
            sessionStorage.setItem('role', userRole);
            sessionStorage.setItem('usn', userName);
            sessionStorage.setItem('pwd', userPwd);

            if (userRole === 'user') {
              localStorage.clear();
            } else if (userRole === 'admin') {
              localStorage.setItem('formAccess', 'isTrue');
            } else if (userRole === 'operator') {
              localStorage.setItem('formAccess', 'isTrue');
              this.router.navigate(['../../form']);
            }
          });
      }
    });
  }

  signOut() {
    this.userRole = 'user';
    this.afa.signOut();
    sessionStorage.clear();
    this.router.navigate(['../../auth/']);
  }

  setUserData(usn, role, pwd) {
    this.userName = usn;
    this.userRole = role;
    this.userPass = pwd;
  }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth <= 500) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
    setTimeout(() => {
      this.isRoute = sessionStorage.getItem('location');
    }, 100);
  }

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;

    if (this.windowWidth <= 700) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }
}
