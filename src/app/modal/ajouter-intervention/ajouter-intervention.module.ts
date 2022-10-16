import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterInterventionPageRoutingModule } from './ajouter-intervention-routing.module';

import { AjouterInterventionPage } from './ajouter-intervention.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterInterventionPageRoutingModule
  ],
  declarations: [AjouterInterventionPage]
})
export class AjouterInterventionPageModule {}
