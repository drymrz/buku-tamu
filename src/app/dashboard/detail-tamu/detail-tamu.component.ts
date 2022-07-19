import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataAPIService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './detail-tamu.component.html',
  styleUrls: ['./detail-tamu.component.scss'],
})
export class DetailTamuComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private api: DataAPIService,
    private location: Location
  ) { }

  idSharedData;
  dateSharedData;
  isLoading;

  fullName;
  inputNo;
  instansi;
  keperluan;
  meetWith;
  phoneNumberPrefix;
  phoneNumber;
  selfieBase64;
  signatureBase64;
  todayDate;
  todayHour;
  todayDay;
  penerimaTamu;

  getSharedData() {
    this.api
      .getDetailDataTamu(this.dateSharedData, this.idSharedData)
      .subscribe((d) => {
        this.fullName = d.payload.data()['fullName'],
          this.instansi = d.payload.data()['instansi'],
          this.keperluan = d.payload.data()['keperluan'],
          this.meetWith = d.payload.data()['meetWith'],
          this.phoneNumberPrefix = d.payload.data()['phoneNumberPrefix'],
          this.phoneNumber = d.payload.data()['phoneNumber'],
          this.selfieBase64 = d.payload.data()['selfieBase64'],
          this.signatureBase64 = d.payload.data()['signatureBase64'],
          this.todayDate = d.payload.data()['tanggalKunjungan'],
          this.todayHour = d.payload.data()['jamKunjungan'],
          this.todayDay = d.payload.data()['hariKunjungan'],
          this.penerimaTamu = d.payload.data()['penerimaTamu']
      });
    this.isLoading = false;
  }

  routerReturn() {
    this.location.back();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.dateSharedData = this.activeRoute.snapshot.params.date;
    this.idSharedData = this.activeRoute.snapshot.params.id;
    this.getSharedData();
    sessionStorage.setItem('location', 'Dashboard / ' + this.dateSharedData + ' / ' + this.idSharedData);
  }

  prevBtn() { }

  nextBtn() { }
}
