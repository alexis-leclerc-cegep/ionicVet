import { Component } from '@angular/core';
import { Client } from '../model/client';
import { ModalController, ToastController } from '@ionic/angular';
import { AjouterClientPage } from '../modal/ajouter-client/ajouter-client.page';
import { ClientService } from '../service/client.service';

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
    public modalController : ModalController,
    public toastController : ToastController,
    public clientService : ClientService) {
      this.listeClients = Array<Client>();
      this.listeClients = this.clientService.obtenirLesClients();
    }

    ionViewWillEnter() {
      this.listeClients = this.clientService.obtenirLesClients();
      //console.log(this.clientService.obtenirLesClients());
    }


  naviguerClient(id: number){}

  async appelerModalAjouterClient() {
    this.modal = await this.modalController.create({component:AjouterClientPage});
    this.modal.present();
    this.modal.onDidDismiss().then(retour => {
      console.log(retour);
      if (retour.role === 'Succès') {
        this.clientService.ajouterClient(retour.data);
        this.afficherToast('Ajout',retour.role);
      }
      else {
        this.afficherToast('Ajout',retour.role);
      }
    });
  }

  async afficherToast(action: string, resultat: string) {
    let texteSucces;
    let texteEchec;
    switch (action) {
      case 'Ajout':
        texteSucces = 'Bien personnel ajouté avec SUCCÈS';
        texteEchec = 'Ajout du Bien Personnel a échoué';
        break;
    }
    let toast: any;
    switch (resultat) {
      case 'Succès':
        toast = await this.toastController.create({color:'success', duration:3000, message: texteSucces});
        break;
      case 'Échec':
        toast = await this.toastController.create({color:'danger', duration:2000, message: texteEchec});
        break;
    }
    await toast.present();
  }
}
