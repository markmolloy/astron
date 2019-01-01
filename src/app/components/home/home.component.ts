import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fileList: any[];
  results: boolean;

  test = [0, 1];

  constructor() { }

  ngOnInit() {
    this.results = false;
  }

  upload(event) {
    this.results = false;
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.results = true;
    }
  }

}
