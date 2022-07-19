import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
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
  dayFormat = 'EEEE';
  dataCount: string;
  convertTanggal: string;

  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
  ) {

    let formatDate = moment(this.todayDate).format('DD-MM-YYYY').toString();
    this.afs
      .collection('dataKunjunganTamu/' + formatDate + '/data/')
      .get()
      .subscribe((snap) => {
        let dbCount = snap.size + 1;
        this.patchEntryFormValue(dbCount.toString());
      });
  }

  patchEntryFormValue(val) {
    this.dataCount = val;
    this.entryForm.controls['inputNo'].patchValue(this.dataCount);
  }

  nextBtn() {
    this.entryFormDataPass.emit(this.entryForm.value);
  }

  resetBtn() {
    this.ngOnInit()
    this.entryForm.controls['inputNo'].patchValue(this.dataCount);
  }

  ngOnInit(): void {
    this.entryForm = this.fb.group({
      inputNo: [0, Validators.required],
      fullName: ['', [Validators.required]],
      instansi: ['', [Validators.required]],
      phoneNumberPrefix: ['+62'],
      phoneNumber: ['', [Validators.pattern, Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      keperluan: ['', [Validators.required]],
      namaGuru: ['', Validators.required],
      tanggalKunjungan: [moment().format('DD-MM-YYYY').toString()],
      hariKunjungan: [moment().format('dddd').toString()],
      jamKunjungan: [moment().format('LT').toString()],
    });
  }
}
