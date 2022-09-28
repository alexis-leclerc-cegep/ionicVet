import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierClientPageRoutingModule } from './modifier-client-routing.module';

import { ModifierClientPage } from './modifier-client.page';
import {SimpleMaskModule} from "ngx-ion-simple-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ModifierClientPageRoutingModule,
        SimpleMaskModule
    ],
  declarations: [ModifierClientPage]
})
export class ModifierClientPageModule {}
