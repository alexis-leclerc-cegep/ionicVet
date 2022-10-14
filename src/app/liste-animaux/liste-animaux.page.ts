import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { TypeAnimal } from '../model/type-animal';
import { Animal } from '../model/animal';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { TypeAnimalService } from '../service/type-animal.service';
import { AnimalService } from '../service/animal.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AjouterAnimalPage} from '../modal/ajouter-animal/ajouter-animal.page';

@Component({
  selector: 'app-liste-animaux',
  templateUrl: './liste-animaux.page.html',
  styleUrls: ['./liste-animaux.page.scss'],
})
export class ListeAnimauxPage implements OnInit {
  modal: any;
  unClient: Client;
  listeClientTemporaire: Array<Client>;
  listeAnimaux: Array<Animal>;
  listeTypeAnimaux: Array<TypeAnimal>;

  constructor(public router: Router,
              public clientService: ClientService,
              public typeAnimalService: TypeAnimalService,
              public animalService: AnimalService,
              public activatedRoute: ActivatedRoute,
              public modalController: ModalController,
              public toastController: ToastController) {
    this.listeTypeAnimaux = new Array<TypeAnimal>();
  }

  async ionViewWillEnter(){
    const idClient = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.clientService.obtenirClient(idClient).subscribe((response) => {
      this.listeClientTemporaire = response as Array<Client>;
      this.unClient = this.listeClientTemporaire[0];
      console.log('recu le message');
      console.log(this.unClient);
    });

    this.typeAnimalService.obtenirListeTypeAnimaux().subscribe((response) => {
      this.listeTypeAnimaux = response as Array<TypeAnimal>;
      console.table(this.listeTypeAnimaux);
    });

    this.animalService.obtenirAnimauxDuClient(idClient).subscribe((response) => {
      this.listeAnimaux = response as Array<Animal>;
      console.table(this.listeAnimaux);
    });
  }

  async appelerModalAjouterAnimal(){
    this.modal = await this.modalController.create(
      {
        component: AjouterAnimalPage,
        componentProps: {unClient: this.unClient, listeTypeAnimaux: this.listeTypeAnimaux}
      });
    this.modal.present();
    this.modal.onDidDismiss().then(retour => {
      if (retour.role === 'working') {
        this.animalService.ajouterAnimal(retour.data);
        this.afficherToast('Ajout fait avec succès', 'primary');
      }
      else{
        this.afficherToast('Ajout échoué', 'danger', 3000);
      }
    });
  }

  obtenirTypeAnimal(idTypeAnimal: number){
    const result = this.listeTypeAnimaux.filter(typeAnimal => typeAnimal.id === idTypeAnimal);
    return result[0].animal;
  }


  retour(){
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
  }

  sortirListe(){
    console.table(this.listeTypeAnimaux);
  }

  async afficherToast(leMessage: string, laCouleur: string = 'primary', leTemps: number = 2000) {
    const toast = await this.toastController.create({color: laCouleur, duration:leTemps, message: leMessage});
    await toast.present();
  }


}
