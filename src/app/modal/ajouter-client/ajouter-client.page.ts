/*
 * Auteur : Alexis Leclerc
 * Date : 2022-09-30
 * Usage : Backend du modal pour ajouter un client
 * Version : 0.1
 */
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.page.html',
  styleUrls: ['./ajouter-client.page.scss'],
})
export class AjouterClientPage implements OnInit {
  unClient: Client = new Client(0, '', '', '', '');

  constructor(public router: Router,
              public clientService: ClientService,
              public geolocation: Geolocation,
              public modalController: ModalController) { }

  ngOnInit(): void { }



  async ajouterClient(){
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
