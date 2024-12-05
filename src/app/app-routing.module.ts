import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonTableauComponent } from './montableau/montableau.component';
import { BatimentComponent } from './batiment/batiment.component';
import { AppercuComponent } from './appercu/appercu.component';

const routes: Routes = [
  { path: '', component: MonTableauComponent }, // Route par défaut
  { path: 'autre-page', component: BatimentComponent },
  { path: 'creer-rapport/:idBat', component: AppercuComponent }, // Dynamic route with parameter
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
