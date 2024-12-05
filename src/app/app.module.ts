import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonTableauComponent } from './montableau/montableau.component';
import { BatimentComponent } from './batiment/batiment.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArrondissmentComponent } from './arrondissment/arrondissment.component';
import { AppercuComponent } from './appercu/appercu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateBatimentModalComponent } from './update-batiment-modal/update-batiment-modal.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    MonTableauComponent, // Ensure your component is declared
    BatimentComponent,
    ArrondissmentComponent,
    AppercuComponent,
    UpdateBatimentModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, // Pour Reactive Forms
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Nécessaire pour les animations Angular Material
    MatDialogModule,
   // Correctement importé ici
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
