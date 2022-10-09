import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { TypeAnimal } from '../model/type-animal';
import { Animal } from '../model/animal';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { TypeAnimalService } from '../service/type-animal.service';
import { AnimalService } from '../service/animal.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
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
              public modalController: ModalController) {
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
        componentProps: {unClient: this.unClient}
      });
  }

  obtenirTypeAnimal(idTypeAnimal: number){
    console.log(idTypeAnimal);
    const result = this.listeTypeAnimaux.filter(typeAnimal => typeAnimal.id === idTypeAnimal);
    console.log(result);
    return result[0].animal;
  }


  ajouterAnimal(){}
  retour(){
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
  }

  sortirListe(){
    console.table(this.listeTypeAnimaux);
  }



}
