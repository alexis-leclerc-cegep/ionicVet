/*
 * Auteur : Alexis Leclerc
 * Date : 2022-09-30
 * Usage : Backend du modal pour modifier un client
 * Version : 0.1
 */
import {Component, Input, OnInit} from '@angular/core';
import { Client } from '../../model/client';
import {ModalController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-modifier-client',
  templateUrl: './modifier-client.page.html',
  styleUrls: ['./modifier-client.page.scss'],
})
export class ModifierClientPage implements OnInit {
  //unClientModel: Client = new Client(0, '', '', '', '');

  @Input() unClient: Client;

  constructor(public modalController: ModalController, public geolocation: Geolocation) { }

  ngOnInit() {
  }

  async modifierClient(unClient: Client){
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.unClient.geolocalisation = resp.coords.latitude + ', ' + resp.coords.longitude;
      this.unClient.prenom = this.unClient.prenom.charAt(0).toUpperCase() + this.unClient.prenom.slice(1);
      this.unClient.nom = this.unClient.nom.charAt(0).toUpperCase() + this.unClient.nom.slice(1);
      this.modalController.dismiss(this.unClient, 'working');
    }).catch((error) => {
      console.log('Error getting location', error);
      this.modalController.dismiss({role: 'Échec', data: this.unClient});
    });
    console.log(this.unClient);
  }

}
