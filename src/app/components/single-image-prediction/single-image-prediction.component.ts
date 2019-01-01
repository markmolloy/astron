import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-single-image-prediction',
  templateUrl: './single-image-prediction.component.html',
  styleUrls: ['./single-image-prediction.component.css'],
  inputs: ['file']
})
export class SingleImagePredictionComponent implements OnInit {
  file: any;
  predictions: any;
  ref: any;
  task: any;
  uploadProgress: any;
  name: any;
  imSrc: any;
  percent: any;
  loading: boolean;

  doc: AngularFirestoreDocument<any>;
  do: AngularFirestoreCollection<any>;

  constructor(private afStorage: AngularFireStorage, public db: AngularFirestore) { }

  ngOnInit() {
    this.upload(this.file);
    this.loading = true;
  }

  upload(file) {
    this.ref = this.afStorage.ref(file.name);
    this.task = this.ref.put(file);
    this.name = file.name;
    this.uploadProgress = this.task.percentageChanges();
    this.getPrediction(this.name);
    this.getImage(file);
  }

  getPrediction(name) {
    this.doc = this.db.doc<any>('images/' + name);
    this.ref = this.doc.valueChanges().subscribe( val => {
      this.predictions = val;
      console.log(val);
      this.loading = this.predictions ? false : true;
      //this.percent = this.confidenceAsPercent(this.predictions.score);
    });
  }

  getImage(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.imSrc = e.target.result;
    }
  }

  confidenceAsPercent(confidenceLevel) {
    console.log('percent = ' + confidenceLevel);
    let percent = confidenceLevel * 100;
    percent = Math.round(percent * 100) / 100;
    return percent;
  }

}
