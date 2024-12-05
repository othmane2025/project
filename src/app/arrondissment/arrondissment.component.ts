import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrondissment',
  templateUrl: './arrondissment.component.html',
  styleUrls: ['./arrondissment.component.css']
})
export class ArrondissmentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private selectedArrondissment: any;

  setArrondissment(arrondissement: any) {
    this.selectedArrondissment = arrondissement;
  }

  getArrondissment() {
    return this.selectedArrondissment;
  }


}
