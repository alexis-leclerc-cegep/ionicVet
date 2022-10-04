/*
 * Auteur : Alexis Leclerc
 * Date : 2022-09-30
 * Usage : Backend de la page d'accueil
 * Version : 0.1
 */
import { Component } from '@angular/core';
import { Client } from '../model/client';
import { ModalController, ToastController } from '@ionic/angular';
import { AjouterClientPage } from '../modal/ajouter-client/ajouter-client.page';
import { ClientService } from '../service/client.service';
import {ModifierClientPage} from '../modal/modifier-client/modifier-client.page';
import {Router} from '@angular/router';

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
    public clientService: ClientService,
    public router: Router) {
      this.listeClients = Array<Client>();
      this.listeClients = this.clientService.obtenirLesClients();
    }

    ionViewWillEnter() {
      this.listeClients = this.clientService.obtenirLesClients();
      //console.log(this.clientService.obtenirLesClients());
    }

  appelerListeAnimaux(unClient: Client){
    this.unClient = unClient;
    this.router.navigate(['/liste-animaux']);
  }
  appelerAjouterAnimal(unClient: Client){}

  async appelerModalModifierClient(unClient: Client) {
    const clientModal: Client = unClient;
    this.modal = await this.modalController.create(
      {component:ModifierClientPage,
       componentProps:{unClient: clientModal}
      });
    this.modal.present();
    this.modal.onDidDismiss().then(retour => {
      if (retour.role === 'working') {
        this.clientService.modifierClient(retour.data);
        this.afficherToast('Modification faite avec succès', 'primary');
        /*
        setTimeout(() => {
          this.listeClients = this.clientService.obtenirLesClients();
        }, 1000);
        */
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
        window.location.reload();
        this.afficherToast('Ajout fait avec succès', 'primary');
      }
      else{
        this.afficherToast('Ajout échoué', 'danger', 3000);
      }
    });
  }
  async supprimerClient(unClient: Client) {
    await this.clientService.supprimerClient(unClient);
    await this.afficherToast('Suppression faite avec succès', 'primary');
    window.location.reload();
  }

  async afficherToast(leMessage: string, laCouleur: string = 'primary', leTemps: number = 2000) {
    const toast = await this.toastController.create({color: laCouleur, duration:leTemps, message: leMessage});
    await toast.present();
  }
}
