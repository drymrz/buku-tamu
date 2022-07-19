import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.scss']
})
export class FormResultComponent implements OnInit {

  isAccess = false;

  constructor(private location: Location, private route: Router) { }

  homeRoute() {
    this.route.navigate(['../../welcome'])
  }

  backRoute() {
    this.route.navigate(['../form']);
  }

  dashboardRoute() {
    this.route.navigate(['../../dashboard']);
  }

  ngOnInit(): void {
    let role = sessionStorage.getItem('role');

    if (role !== 'user') {
      this.isAccess = false
    } else {
      this.isAccess = true;
    }
  }

}
