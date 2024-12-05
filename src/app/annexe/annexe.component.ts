import { Component } from '@angular/core';

@Component({
  selector: 'app-annexe',
  templateUrl: './annexe.component.html',
  styleUrls: ['./annexe.component.css']
})
export class AnnexeComponent {

  private selectedAnnexe: any;

  setAnnexe(annexe: any) {
    this.selectedAnnexe = annexe;
  }

  getAnnexe() {
    return this.selectedAnnexe;
  }

}
