import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeAnimauxPageRoutingModule } from './liste-animaux-routing.module';

import { ListeAnimauxPage } from './liste-animaux.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeAnimauxPageRoutingModule
  ],
  declarations: [ListeAnimauxPage]
})
export class ListeAnimauxPageModule {}
