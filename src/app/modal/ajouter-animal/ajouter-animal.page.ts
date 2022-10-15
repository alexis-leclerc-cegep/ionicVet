/*
 * Auteur : Alexis Leclerc
 * Date : 2022-09-30
 * Usage : Backend du modal pour ajouter des animaux
 * Version : 0.1
 */
import {Component, Input, OnInit} from '@angular/core';
import { Animal } from '../../model/animal';
import { Client } from '../../model/client';
import { TypeAnimal } from '../../model/type-animal';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ajouter-animal',
  templateUrl: './ajouter-animal.page.html',
  styleUrls: ['./ajouter-animal.page.scss'],
})
export class AjouterAnimalPage implements OnInit {
  @Input() unClient: Client;
  listeTypeAnimaux: Array<TypeAnimal>;
  unAnimal: Animal = new Animal(0, '', 0, 0, new Date(''));
  dateNaissance: Date;

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
  }

  ajouterAnimal(){
    this.unAnimal.idClient = this.unClient.id;
    this.unAnimal.dateNaissance = this.dateNaissance; //ne marche pas si je le mets direct dans unAnimal, je ne sais pas pourquoi
    this.modalController.dismiss(this.unAnimal, 'working');
  }
}
