import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterAnimalPageRoutingModule } from './ajouter-animal-routing.module';

import { AjouterAnimalPage } from './ajouter-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterAnimalPageRoutingModule
  ],
  declarations: [AjouterAnimalPage]
})
export class AjouterAnimalPageModule {}
