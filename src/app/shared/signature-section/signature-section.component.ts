import { Component, ViewChild, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';
import { SignaturePad } from 'ngx-signaturepad';

@Component({
  selector: 'app-signature-section',
  templateUrl: './signature-section.component.html',
  styleUrls: ['./signature-section.component.scss']
})
export class SignatureSectionComponent implements AfterViewInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @Output() signatureDataPass: EventEmitter<any> = new EventEmitter;
  @Output() prevTab: EventEmitter<any> = new EventEmitter;


  doneDraw = false;

  signaturePadDesktop: Object = {
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 260,
  };

  signaturePadMobile: Object = {
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 450,
  };
  windowWidth: number;
  isMobileView = false;

  constructor() { }

  ngAfterViewInit() {
    this.signaturePad.clear();
  }

  drawComplete() {
    this.doneDraw = true;
  }

  nextBtn() {
    this.signatureDataPass.emit(this.signaturePad.toDataURL().slice(22))
  }

  resetBtn() {
    this.signaturePad.clear()
    this.doneDraw = false;
  }

  backBtn() {
    this.prevTab.emit();
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
