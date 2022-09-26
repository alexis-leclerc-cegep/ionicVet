import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AjouterClientPageRoutingModule } from './ajouter-client-routing.module';

import { AjouterClientPage } from './ajouter-client.page';
import {SimpleMaskModule} from "ngx-ion-simple-mask";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterClientPageRoutingModule,
    SimpleMaskModule,
  ],
  declarations: [AjouterClientPage]
})
export class AjouterClientPageModule {}
