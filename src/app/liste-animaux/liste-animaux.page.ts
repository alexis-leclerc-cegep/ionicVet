import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { TypeAnimal } from '../model/type-animal';
import { Animal } from '../model/animal';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { TypeAnimalService } from '../service/type-animal.service';

@Component({
  selector: 'app-liste-animaux',
  templateUrl: './liste-animaux.page.html',
  styleUrls: ['./liste-animaux.page.scss'],
})
export class ListeAnimauxPage implements OnInit {
  unClient: Client;
  listeTypeAnimaux: Array<TypeAnimal>;

  constructor(public router: Router,
              public clientService: ClientService,
              public typeAnimalService: TypeAnimalService,
              public typeAnimal: TypeAnimal) {
    this.listeTypeAnimaux = new Array<TypeAnimal>();
  }

  ngOnInit() {
    this.unClient = this.clientService.getClient();
    this.listeTypeAnimaux = this.typeAnimalService.getListeTypeAnimaux();
    console.table(this.listeTypeAnimaux);
  }



}
