import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeInterventionsPage } from './liste-interventions.page';

const routes: Routes = [
  {
    path: '',
    component: ListeInterventionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeInterventionsPageRoutingModule {}
