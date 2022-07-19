import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataAPIService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss'],
})
export class FormLayoutComponent implements OnInit {
  index = 0;
  tabs = [
    {
      disabled: true,
    },
    {
      disabled: true,
    },
    {
      disabled: true,
    },
  ];
  windowWidth;
  isMobileView = false;
  isSpinning = false;
  isVisible = false;
  isOkLoading = false;
  dataForm;
  imageBase64Data;
  signatureBase64Data;

  constructor(
    private crudSvc: DataAPIService,
    private notif: NzNotificationService,
    private router: Router
  ) {}

  nextTab() {
    this.tabs[this.index].disabled = false;
    this.index += 1;
  }

  prevTab() {
    this.index -= 1;
  }

  tabImage() {
    this.index -= 2;
  }

  // Handle Post Data

  storeFormData() {
    let Record = {};

    Record['date'] = this.dataForm.date;
    Record['fullName'] = this.dataForm.fullName;
    Record['whereFrom'] = this.dataForm.whereFrom;

    Record['phoneNumberPrefix'] = this.dataForm.phoneNumberPrefix;
    Record['phoneNumber'] = this.dataForm.phoneNumber;

    Record['meetWith'] = this.dataForm.meetWith;
    Record['necessity'] = this.dataForm.necessity;
    // Record['penerimaTamu'] = sessionStorage.getItem('usn');

    Record['selfieBase64'] = this.imageBase64Data;
    Record['signatureBase64'] = this.signatureBase64Data;

    sessionStorage.setItem('dataForm', JSON.stringify(Record));
    this.dataForm = Record;
  }

  submitEvent() {
    this.postForm();
    this.ngOnInit();
  }

  postForm() {
    this.crudSvc.postDataKunjungan(this.dataForm).subscribe((res) => {});
    // this.crudSvc
    //   .postDataKunjungan(
    //     this.dataForm.tanggalKunjungan,
    //     this.dataForm.inputNo,
    //     Record
    //   )
    //   .then(() => {
    //     this.currentStep = 0;
    //     this.isSpinning = false;
    //     this.isOkLoading = false;
    //     this.isVisible = false;
    //     this.router.navigate(['form/result']);
    //   });
  }

  entryFormDataPass(data) {
    this.nextTab();
    this.dataForm = data;
    if (sessionStorage.dataForm) {
      this.storeFormData();
    }
  }

  imageBase64(data) {
    this.nextTab();
    this.imageBase64Data = data;
    if (sessionStorage.dataForm) {
      this.storeFormData();
    }
  }

  signatureDataPass(data) {
    this.signatureBase64Data = data;
    this.nextTab();
    this.storeFormData();
  }

  ngOnInit(): void {
    sessionStorage.removeItem('dataForm');
    sessionStorage.removeItem('imageBase64');
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
