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
  client: Client = new Client(0, '', '', '', '');

  constructor(public router: Router,
              public clientService: ClientService,
              public geolocation: Geolocation,
              public modalController: ModalController) { }

  ngOnInit(): void { }



  async ajouterClient(){
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.client.geolocalisation = resp.coords.latitude + ', ' + resp.coords.longitude;
      this.client.prenom = this.client.prenom.toUpperCase();
      this.client.nom = this.client.nom.charAt(0).toUpperCase() + this.client.nom.slice(1);
      const retourAjout: boolean = this.clientService.ajouterClient(this.client);
      this.modalController.dismiss({role: 'Succès', data: this.client, retour: retourAjout});
    }).catch((error) => {
      console.log('Error getting location', error);
      this.modalController.dismiss({role: 'Échec', data: this.client});
    });
    console.log(this.client);
  }

}
