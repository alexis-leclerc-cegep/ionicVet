import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeAnimauxPage } from './liste-animaux.page';

const routes: Routes = [
  {
    path: '',
    component: ListeAnimauxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeAnimauxPageRoutingModule {}
