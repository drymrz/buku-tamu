import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataAPIService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  uEmail;
  fullName;
  jabatan;
  role;
  dateCreated;
  createdBy;
  passwordVisible;
  uPass;

  constructor(private api: DataAPIService, private aRoute: ActivatedRoute, private location: Location) { }

  getUserDetail() {
    this.api.getSingleDataUser(this.uEmail).subscribe((d) => {
      this.fullName = d.payload.data()['fullName'];
      this.jabatan = d.payload.data()['jabatan'];
      this.role = d.payload.data()['role'];
      this.uPass = d.payload.data()['password']
      this.dateCreated = d.payload.data()['dateCreated'];
      this.createdBy = d.payload.data()['createdBy'];
    })
  }

  ngOnInit(): void {
    this.uEmail = this.aRoute.snapshot.params.id;
    this.getUserDetail()
  }


  routerReturn() {
    this.location.back();
  }

}
