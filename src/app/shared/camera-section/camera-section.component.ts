import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-camera-section',
  templateUrl: './camera-section.component.html',
  styleUrls: ['./camera-section.component.scss'],
})
export class CameraSectionComponent implements OnInit {
  disableBtn = true;

  @Output() imageBase64: EventEmitter<any> = new EventEmitter();
  @Output() prevTab: EventEmitter<any> = new EventEmitter();

  public webcamImage: WebcamImage = null;
  storedImage;
  windowWidth: number;
  isMobileView = false;

  constructor() {}

  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
    this.trigger.next();
    sessionStorage.setItem(
      'imageBase64',
      JSON.stringify(this.webcamImage.imageAsBase64)
    );
  }

  public handleInitError(error: WebcamInitError): void {
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === 'NotAllowedError'
    ) {
      alert(' Kamera Tidak Dapat di Akses !');
    }
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  resetImage() {
    this.webcamImage = null;
    this.storedImage = null;
    sessionStorage.removeItem('imageBase64');
  }

  nextBtn() {
    if (this.storedImage) {
      this.imageBase64.emit(this.storedImage);
    } else {
      this.imageBase64.emit(this.webcamImage.imageAsBase64);
    }
  }

  backBtn() {
    this.prevTab.emit();
  }

  ngOnInit(): void {
    if (sessionStorage.imageBase64) {
      this.storedImage = JSON.parse(sessionStorage.imageBase64);
    }

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
