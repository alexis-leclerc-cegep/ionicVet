import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeInterventionsPageRoutingModule } from './liste-interventions-routing.module';

import { ListeInterventionsPage } from './liste-interventions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeInterventionsPageRoutingModule
  ],
  declarations: [ListeInterventionsPage]
})
export class ListeInterventionsPageModule {}
