import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterAnimalPage } from './ajouter-animal.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterAnimalPageRoutingModule {}
