import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataAPIService } from 'src/app/services/data-api.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-desc-table',
  templateUrl: './desc-table.component.html',
  styleUrls: ['./desc-table.component.scss']
})
export class DescTableComponent implements OnInit {

  idSharedData;
  isSpinning;
  dataTamu;
  dateFormat = 'dd-MM-yyyy';


  constructor(private activeRoute: ActivatedRoute, private api: DataAPIService, private location: Location) { }

  getDatabyDate() {
    this.isSpinning = true;
    this.api.getSingleDataTamu(this.idSharedData).subscribe((data) => {
      this.dataTamu = data.map((u) => {
        return {
          id: u.payload.doc.id,
          fullName: u.payload.doc.data()['fullName'],
          instansi: u.payload.doc.data()['instansi'],
          jamKunjung: u.payload.doc.data()['jamKunjungan'],
          tanggalKunjung: u.payload.doc.data()['tanggalKunjungan']
        };
      });
      this.isSpinning = false;
    });
  }

  routerReturn() {
    this.location.back()
  }

  ngOnInit(): void {
    this.idSharedData = this.activeRoute.snapshot.params.id;
    this.getDatabyDate()
    sessionStorage.setItem('location', 'Dashboard / ' + this.idSharedData);

  }

}
