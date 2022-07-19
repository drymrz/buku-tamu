import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-verify-section',
  templateUrl: './verify-section.component.html',
  styleUrls: ['./verify-section.component.scss'],
})
export class VerifySectionComponent implements OnInit {
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() prevTab: EventEmitter<any> = new EventEmitter();
  @Output() tabImage: EventEmitter<any> = new EventEmitter();

  dataForm;
  date;
  hour;

  constructor(private nzImageService: NzImageService) {}

  backBtn() {
    this.prevTab.emit();
  }

  submitBtn() {
    this.submitEvent.emit();
  }

  imageTab() {
    this.tabImage.emit();
  }

  selfiePreview() {
    const images = [
      {
        src: 'data:image/jpeg;base64,' + this.dataForm.selfieBase64,
      },
    ];
    this.nzImageService.preview(images, { nzZoom: 1, nzRotate: 0 });
  }

  signaturePreview() {
    const images = [
      {
        src: 'data:image/jpeg;base64,' + this.dataForm.signatureBase64,
      },
    ];
    this.nzImageService.preview(images, { nzZoom: 1, nzRotate: 0 });
  }

  ngOnInit(): void {
    this.dataForm = JSON.parse(sessionStorage.dataForm);
    this.date = moment(this.dataForm.date).format('dddd, DD-MM-YYYY');
    this.hour = moment(this.dataForm.date).format('LT');
  }
}
