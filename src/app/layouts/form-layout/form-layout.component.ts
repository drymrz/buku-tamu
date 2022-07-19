import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataAPIService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss'],
})
export class FormLayoutComponent implements OnInit {
  windowWidth;
  isMobileView = false;
  isSpinning = false;
  isVisible = false;
  isOkLoading = false;
  currentStep = 0;
  disable = false;
  dataForm;
  imageBase64Data;
  signatureBase64Data;
  dataKunjunganCount;

  constructor(
    private crudSvc: DataAPIService,
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private notif: NzNotificationService,
    private router: Router
  ) {
    this.afs
      .collection('dataKunjunganTamu')
      .get()
      .subscribe((snap) => {
        let dbCount = snap.size;
        this.setCount(dbCount.toString());
      });

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
            sessionStorage.setItem('role', userRole);
            sessionStorage.setItem('email', emailLower);
            sessionStorage.setItem('usn', userName);
            sessionStorage.setItem('pwd', userPwd);

            if (userRole === 'user') {
              localStorage.clear();
              this.router.navigate(['../../dashboard']);
            } else if (userRole === 'operator') {
              localStorage.setItem('formAccess', 'isTrue');
            }

            if (sessionStorage.getItem('relog_pass')) {
              if (userRole === 'admin') {
                localStorage.setItem('formAccess', 'isTrue');
                this.router.navigate(['../../users/table']);
                sessionStorage.removeItem('relog_pass');
              }
            }
          });
      }
    });
  }

  setCount(data) {
    this.dataKunjunganCount = data;
  }

  // Handle Step Change
  onIndexChange(index: number): void {
    this.currentStep = index;
  }

  // Handle Post Data
  postForm() {
    let toNumber = parseInt(this.dataForm.inputNo);
    let toNumber_2 = parseInt(this.dataKunjunganCount);

    let Record = {};

    Record['no'] = toNumber;

    Record['hariKunjungan'] = this.dataForm.hariKunjungan;
    Record['tanggalKunjungan'] = this.dataForm.tanggalKunjungan;
    Record['jamKunjungan'] = this.dataForm.jamKunjungan;

    Record['fullName'] = this.dataForm.fullName;
    Record['instansi'] = this.dataForm.instansi;

    Record['phoneNumberPrefix'] = this.dataForm.phoneNumberPrefix;
    Record['phoneNumber'] = this.dataForm.phoneNumber;

    Record['meetWith'] = this.dataForm.namaGuru;
    Record['keperluan'] = this.dataForm.keperluan;
    Record['penerimaTamu'] = sessionStorage.getItem('usn')

    Record['selfieBase64'] = this.imageBase64Data;
    Record['signatureBase64'] = this.signatureBase64Data;

    let PatchValue = {};

    if (toNumber === 1) {
      var added = toNumber_2 + 1;
      PatchValue['no'] = added;
    } else {
      PatchValue['no'] = toNumber_2;
    }

    PatchValue['jumlahData'] = toNumber;

    this.crudSvc.putTanggalKunjungan(
      this.dataForm.tanggalKunjungan,
      PatchValue
    );

    this.crudSvc
      .postDataKunjungan(
        this.dataForm.tanggalKunjungan,
        this.dataForm.inputNo,
        Record
      )
      .then(() => {
        this.currentStep = 0;
        this.isSpinning = false;
        this.isOkLoading = false;
        this.isVisible = false;
        // this.notifSuccessSubmit();
        this.router.navigate(['form/result']);
      });
  }

  entryFormDataPass(data) {
    this.currentStep += 1;
    this.dataForm = data;
  }

  prevAction() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    }
  }

  imageBase64(data) {
    this.currentStep += 1;
    this.imageBase64Data = data;
  }

  signatureDataPass(data) {
    this.signatureBase64Data = data;
    this.showModal();
  }

  // notifSuccessSubmit() {
  //   this.notif.success(
  //     'Data Submitted',
  //     'Terimakasih sudah mengisi data buku tamu !'
  //   );
  // }

  showModal(): void {
    this.isSpinning = true;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.postForm();
  }

  handleCancel(): void {
    this.isSpinning = false;
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;

    if (this.windowWidth <= 500) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
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
