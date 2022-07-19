import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataAPIService {

  constructor(private afStore: AngularFirestore) { }

  getDataTamu() {
    return this.afStore.collection('dataKunjunganTamu').snapshotChanges();
  }

  getSingleDataTamu(date) {
    return this.afStore.collection('dataKunjunganTamu/' + date + '/data/').snapshotChanges();
  }

  getDetailDataTamu(date, id) {
    return this.afStore.collection('dataKunjunganTamu/' + date + '/data/').doc(id).snapshotChanges();
  }

  getDataUser() {
    return this.afStore.collection('dataUser').snapshotChanges();
  }

  getSingleDataUser(userEmail) {
    return this.afStore.collection('dataUser').doc(userEmail).snapshotChanges();
  }

  putTanggalKunjungan(date, data) {
    return this.afStore.collection('dataKunjunganTamu').doc(date).set(data);
  }

  postDataKunjungan(date, id, formData) {
    return this.afStore.collection('dataKunjunganTamu/' + date + '/data/').doc(id).set(formData);
  }

  getDataGuru() {
    return this.afStore.collection('dataGuru').snapshotChanges();
  }
}
