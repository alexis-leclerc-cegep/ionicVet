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


  naviguerClient(id: number){}

  async appelerModalAjouterClient() {
    this.modal = await this.modalController.create({component:AjouterClientPage});
    this.modal.present();
    this.modal.onDidDismiss().then(retour => {
        if(retour.data.retour){
          console.log('marcher');
          //this.listeClients = this.clientService.obtenirLesClients();
          this.ionViewWillEnter();
          this.afficherToast('Ajout', 'Succès');
        }
        else{
          console.log('po marcher');
          this.afficherToast('Ajout', 'Échec');
        }
      console.log('role appeler toast : ' + retour.data.role);
    });
  }

  async afficherToast(action: string, resultat: string) {
    console.log(resultat);
    let texteSucces;
    let texteEchec;
    switch (action) {
      case 'Ajout':
        texteSucces = 'Bien personnel ajouté avec SUCCÈS';
        texteEchec = 'Ajout du Bien Personnel a échoué';
        break;
    }
    let leMessage = '';
    switch (resultat) {
      case 'Succès':
        console.log('Succès');
        leMessage = texteSucces;
        break;
      case 'Échec':
        console.log('Échec');
        leMessage = texteEchec;
        break;
    }
    console.log(leMessage);
    const toast = await this.toastController.create({color:'danger', duration:2000, message:leMessage});
    await toast.present();
  }
}
