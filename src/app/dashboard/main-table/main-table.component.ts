import { Component, OnInit, HostListener } from '@angular/core';
import { DataAPIService } from 'src/app/services/data-api.service';
import * as moment from 'moment';
import 'moment/locale/id';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
moment.locale('id');

interface tamu {
  id: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
})
export class MainTableComponent implements OnInit {
  constructor(private api: DataAPIService, private afs: AngularFirestore, private router: Router) { }

  index = 0;
  dataTamu: tamu[] = [];
  isSpinning = false;
  windowWidth;
  isMobileView = false;
  selectDate;
  select_date;
  dateFormat = 'dd-MM-yyyy';

  getAllData() {
    this.isSpinning = true;
    this.api.getDataTamu().subscribe((data) => {
      this.dataTamu = data.map((u) => {
        return {
          id: u.payload.doc.id,
          no: u.payload.doc.data()['no'],
          jumlahData: u.payload.doc.data()['jumlahData']
        };
      });
      this.isSpinning = false;
    });
  }


  getDatabyDate(date) {
    let formatDate = moment(date).format('DD-MM-YYYY')
    this.router.navigate(['table/' + formatDate])
  }

  ngOnInit(): void {
    sessionStorage.setItem('location', 'Dashboard');

    this.windowWidth = window.innerWidth;
    if (this.windowWidth <= 500) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }

    this.getAllData()
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
