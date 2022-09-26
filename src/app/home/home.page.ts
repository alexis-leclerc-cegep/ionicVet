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
      console.log(retour);
      console.log(retour.data.role);
      if (retour.data.role === 'Succès') {
        const retourAjout: boolean = this.clientService.ajouterClient(retour.data);
        if(retour){
          console.log('pas marcher');
          retour.data.role = 'Échec';
        }
        else{
          console.log('marcher');
        }
      }
      console.log('role appeler toast : ' + retour.data.role);
      this.afficherToast('Ajout',retour.data.role);
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
