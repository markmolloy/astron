import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  predictions: any;
  ref: any;
  task: any;
  uploadProgress: any;
  name: any;

  doc: AngularFirestoreDocument<any>;
  do: AngularFirestoreCollection<any>;

  @ViewChild('nm') nm: ElementRef;

  constructor(private afStorage: AngularFireStorage, public db: AngularFirestore) { }

  ngOnInit() {
    this.predictions = {
      predictions: ''
    };
  }

  upload(event) {
    this.ref = this.afStorage.ref(event.target.files[0].name);
    this.task = this.ref.put(event.target.files[0]);
    this.name = event.target.files[0].name;
    this.uploadProgress = this.task.percentageChanges();
    this.getPrediction(this.name);
  }

  getPrediction(name) {
    this.doc = this.db.doc<any>('images/' + name);
    this.ref = this.doc.valueChanges().subscribe( val => {
      this.predictions = val;
      console.log(val);
    });
  }

}
