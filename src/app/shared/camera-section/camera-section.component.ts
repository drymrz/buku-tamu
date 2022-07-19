import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-camera-section',
  templateUrl: './camera-section.component.html',
  styleUrls: ['./camera-section.component.scss'],
})
export class CameraSectionComponent implements OnInit {
  disableBtn = true;

  @Output() imageBase64: EventEmitter<any> = new EventEmitter();

  public webcamImage: WebcamImage = null;
  windowWidth: number;
  isMobileView = false;

  constructor() {}

  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
    this.trigger.next();
    this.disableBtn = true;
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  resetImage() {
    this.webcamImage = null;
    this.enableBtn();
  }

  nextBtn() {
    this.imageBase64.emit(this.webcamImage.imageAsBase64.toString());
  }

  enableBtn() {
    setTimeout(() => {
      this.disableBtn = false;
    }, 2500);
  }

  ngOnInit(): void {
    this.enableBtn();

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
