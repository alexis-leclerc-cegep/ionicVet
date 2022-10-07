import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { TypeAnimal } from '../model/type-animal';
import { Animal } from '../model/animal';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { TypeAnimalService } from '../service/type-animal.service';
import { AnimalService } from '../service/animal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liste-animaux',
  templateUrl: './liste-animaux.page.html',
  styleUrls: ['./liste-animaux.page.scss'],
})
export class ListeAnimauxPage implements OnInit {
  unClient: Client;
  listeAnimaux: Array<Animal>;
  listeTypeAnimaux: Array<TypeAnimal>;

  constructor(public router: Router,
              public clientService: ClientService,
              public typeAnimalService: TypeAnimalService,
              public animalService: AnimalService,
              public activatedRoute: ActivatedRoute) {
    this.listeTypeAnimaux = new Array<TypeAnimal>();
  }

  ionViewWillEnter(){ }
  ngOnInit() {
    const idClient = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.clientService.obtenirClient(idClient).subscribe((response) => {
      this.unClient = response as Client;
      console.log(this.unClient);
    });

    this.typeAnimalService.obtenirListeTypeAnimaux().subscribe((response) => {
      this.listeTypeAnimaux = response as Array<TypeAnimal>;
      console.table(this.listeTypeAnimaux);
    });

    this.animalService.obtenirAnimauxDuClient(this.unClient.id).subscribe((response) => {
      this.listeAnimaux = response as Array<Animal>;
      //console.table(this.unClient.listeAnimaux);
    });
  }

  sortirListe(){
    console.table(this.listeTypeAnimaux);
  }



}
