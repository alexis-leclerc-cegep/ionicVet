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
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController,
    public router: Router) {
      this.listeClients = Array<Client>();
      this.obtenirLesClientsService();
    }

    ionViewWillEnter() {
      this.obtenirLesClientsService();
      //console.log(this.clientService.obtenirLesClients());
    }

  appelerListeAnimaux(unClient: Client){
    this.router.navigate(['/liste-animaux', {id: unClient.id}]);
  }

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
          this.listeClients = this.clientService.obtenirLesClients();
        }, 1000);
        */
      }
      else{
        this.afficherToast('Modification échouée', 'danger', 3000);
      }
    });
  }

  obtenirLesClientsService(){
    this.clientService.obtenirLesClients().subscribe((reponse) => {this.listeClients = reponse as Array<Client>;});
  }

  async appelerModalAjouterClient() {
    this.modal = await this.modalController.create({component:AjouterClientPage});
    this.modal.present();
    this.modal.onDidDismiss().then(async retour => {
      if (retour.role === 'working') {
        (await this.clientService.ajouterClient(retour.data)).subscribe((reponse) => {
          this.obtenirLesClientsService();
          this.afficherToast('Ajout fait avec succès', 'primary');
        });
      } else {
        this.afficherToast('Ajout échoué', 'danger', 3000);
      }
    });
  }
  async supprimerClient(unClient: Client) {
    const alert = await this.alertController.create({
      header: 'Attention!',
      message: 'Voulez-vous vraiment supprimer ce client? Il peut avoir des animaux et interventions d\'associées.',
      buttons:[
        {
          text: 'Annuler',
          role: 'annuler',
          handler: () => {
            console.log('Annuler');
          }
        },
        {
          text: 'Supprimer',
          role: 'supprimer',
          handler: async () => {
            (await this.clientService.supprimerClient(unClient)).subscribe((reponse) => {
              this.obtenirLesClientsService();
              this.afficherToast('Suppression faite avec succès', 'primary');
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async afficherToast(leMessage: string, laCouleur: string = 'primary', leTemps: number = 2000) {
    const toast = await this.toastController.create({color: laCouleur, duration:leTemps, message: leMessage});
    await toast.present();
  }
}
