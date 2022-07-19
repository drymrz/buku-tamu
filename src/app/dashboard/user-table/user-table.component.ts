import { Component, OnInit } from '@angular/core';
import { DataAPIService } from '../../services/data-api.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  isSpinning;
  dataUser;
  tableNumber = 1;

  constructor(private api: DataAPIService) { }


  getAllUserData() {
    this.isSpinning = true;
    this.api.getDataUser().subscribe((data) => {
      this.dataUser = data.map((u) => {
        return {
          id: u.payload.doc.id,
          fullName: u.payload.doc.data()['fullName'],
          jabatan: u.payload.doc.data()['jabatan'],
          password: u.payload.doc.data()['password'],
          role: u.payload.doc.data()['role']
        };
      });
      this.isSpinning = false;
    });
  }

  ngOnInit(): void {
    this.getAllUserData()
    sessionStorage.setItem('location', 'Table User');
  }

}
