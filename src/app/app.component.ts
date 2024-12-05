import { Component } from '@angular/core';
import { MonTableauComponent } from './montableau/montableau.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BatimentComponent } from './batiment/batiment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'batiment-project';
}
