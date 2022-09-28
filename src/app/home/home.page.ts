import { Component } from '@angular/core';
import { Client } from '../model/client';
import { ModalController, ToastController } from '@ionic/angular';
import { AjouterClientPage } from '../modal/ajouter-client/ajouter-client.page';
import { ClientService } from '../service/client.service';
import {ModifierClientPage} from "../modal/modifier-client/modifier-client.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  modal: any;
  retour: any;
  listeClients: Array<Client>;
  unClient: Client;

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    public clientService: ClientService) {
      this.listeClients = Array<Client>();
      this.listeClients = this.clientService.obtenirLesClients();
    }

    ionViewWillEnter() {
      this.listeClients = this.clientService.obtenirLesClients();
      //console.log(this.clientService.obtenirLesClients());
    }

  appelerListeAnimaux(unClient: Client){}
  appelerAjouterAnimal(unClient: Client){}

  async appelerModalModifierClient(unClient: Client) {
    const clientModal: Client = unClient;
    this.modal = await this.modalController.create(
      {component:ModifierClientPage,
       componentProps:{unClient: unClient}
      });
    this.modal.present();
    this.modal.onDidDismiss().then(retour => {
      if (retour.role === 'working') {
       // this.clientService.modifierClient(retour.data);
        this.ionViewWillEnter();
        this.afficherToast('Modification faite avec succès', 'primary');
      }
      else{
        this.afficherToast('Modification échouée', 'danger', 3000);
      }
    });
  }

  async appelerModalAjouterClient() {
    this.modal = await this.modalController.create({component:AjouterClientPage});
    this.modal.present();
    this.modal.onDidDismiss().then(retour => {
      if (retour.role === 'working') {
        this.clientService.ajouterClient(retour.data);
        //this.listeClients = this.clientService.obtenirLesClients();
        this.ionViewWillEnter();
        this.afficherToast('Ajout fait avec succès', 'primary');
      }
      else{
        this.afficherToast('Ajout échoué', 'danger', 3000);
      }
    });
  }

  async afficherToast(leMessage: string, laCouleur: string = 'primary', leTemps: number = 2000) {
    const toast = await this.toastController.create({color: laCouleur, duration:leTemps, message: leMessage});
    await toast.present();
  }
}
