import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

@Component({
  selector: 'app-form-section',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss'],
})
export class FormSectionComponent implements OnInit {
  @Output() entryFormDataPass: EventEmitter<any> = new EventEmitter();

  entryForm: FormGroup;
  todayDate = Date();
  dateFormat = 'dd-MM-yyyy';

  isFirstSlide = true;
  isVisible = false;
  isOkLoading = false;

  constructor(private fb: FormBuilder, private location: Location) {}

  nextBtn() {
    // this.showModal();
    this.entryFormDataPass.emit(this.entryForm.value);
  }

  routerBack() {
    this.location.back();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  nextSlide() {
    this.isFirstSlide = false;
  }

  prevBtn() {
    this.isFirstSlide = true;
  }

  ngOnInit(): void {
    this.entryForm = this.fb.group({
      date: [moment(new Date()).format('YYYY-MM-DD h:mm:ss')],
      fullName: ['', [Validators.required]],
      whereFrom: ['', [Validators.required]],
      phoneNumberPrefix: ['+62'],
      phoneNumber: [
        '',
        [
          Validators.pattern,
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      ],
      necessity: ['', [Validators.required]],
      meetWith: ['', Validators.required],
    });
  }
}
