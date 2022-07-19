import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DataAPIService } from 'src/app/services/data-api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-kunjungan',
  templateUrl: './detail-kunjungan.component.html',
  styleUrls: ['./detail-kunjungan.component.scss'],
})
export class DetailKunjunganComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private api: DataAPIService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  idSharedData;
  dateSharedData;
  isLoading;
  detailData;
  penerimaTamu;
  selfieBase64: SafeUrl;
  signatureBase64: SafeUrl;

  routerReturn() {
    this.location.back();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.idSharedData = this.activeRoute.snapshot.params.id;
    this.api.getDetailData(this.idSharedData).subscribe((res) => {
      let detailData = res.data.map((d) => {
        return {
          id: d.id,
          fullName: d.fullName,
          day: moment(d.date).format('dddd'),
          date: moment(d.date).format('DD-MM-YYYY'),
          time: moment(d.date).format('LT'),
          meetWith: d.meetWith,
          necessity: d.necessity,
          phoneNumber: d.phoneNumber,
          selfieBase64: d.selfieBase64,
          signatureBase64: d.signatureBase64,
          whereFrom: d.whereFrom,
        };
      });
      this.detailData = detailData[0];
      let notSafeImg = 'data:image/jpeg;base64,' + this.detailData.selfieBase64;
      let notSafeSig =
        'data:image/png;base64,' + this.detailData.signatureBase64;

      this.selfieBase64 = this.sanitizer.bypassSecurityTrustUrl(notSafeImg);
      this.signatureBase64 = this.sanitizer.bypassSecurityTrustUrl(notSafeSig);
      this.isLoading = false;
    });
  }
}
