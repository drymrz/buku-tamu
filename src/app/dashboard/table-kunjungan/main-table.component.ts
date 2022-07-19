import { Component, OnInit, HostListener } from '@angular/core';
import { DataAPIService } from 'src/app/services/data-api.service';
import * as moment from 'moment';
import 'moment/locale/id';
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
  constructor(private api: DataAPIService, private router: Router) {}

  index = 0;
  dataTamu: tamu[] = [];
  isSpinning = false;
  windowWidth;
  isMobileView = false;

  ngOnInit(): void {
    sessionStorage.setItem('location', 'Dashboard');

    this.api.getAllData().subscribe((res) => {
      this.dataTamu = res.data.map((t) => {
        return {
          id: t.id,
          fullName: t.fullName,
          date: moment(t.date).format('DD-MM-YYYY'),
          time: moment(t.date).format('LT'),
        };
      });
    });

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
