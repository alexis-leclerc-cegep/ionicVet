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
  modal : any;
  retour : any;

  constructor(public client : Client,
              public modalController : ModalController,
              public toastController : ToastController,
              public clientService : ClientService) {}

  ngOnInit() {
  }

    async appelerModalAjouterBien() {
    this.modal = await this.modalController.create({component:AjouterClientPage});
    this.modal.present();
    this.modal.onDidDismiss().then(retour => {
      console.log(retour);
      if (retour.role === 'Succès') {
        this.clientService.ajouterClient(retour.data);
        this.afficherToast('Ajout',retour.role);
      }
      else this.afficherToast('Ajout',retour.role);
    })
  }
  async afficherToast (action:string, resultat:string) {
    switch (action) {
      case 'Ajout':
        var texteSucces = "Bien personnel ajouté avec SUCCÈS";
        var texteEchec = "Ajout du Bien Personnel a échoué";
        break;
    }
    switch (resultat) {
      case 'Succès':
        var toast = await this.toastController.create({color:'success', duration:3000, message:texteSucces});
        break;
      case 'Échec':
        var toast = await this.toastController.create({color:'danger', duration:2000, message:texteEchec});
        break;
    }
    await toast.present();
  }
}
