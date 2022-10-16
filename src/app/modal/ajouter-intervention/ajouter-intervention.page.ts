/*
 * Auteur : Alexis Leclerc
 * Date : 2022-09-30
 * Usage : Backend du modal pour ajouter des animaux
 * Version : 0.1
 */
import {Component, Input, OnInit} from '@angular/core';
import { Intervention } from '../../model/intervention';
import { Animal } from '../../model/animal';
import { TypeIntervention } from '../../model/type-intervention';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ajouter-intervention',
  templateUrl: './ajouter-intervention.page.html',
  styleUrls: ['./ajouter-intervention.page.scss'],
})
export class AjouterInterventionPage implements OnInit {
  @Input() unAnimal: Animal;
  @Input() listeTypeInterventions: Array<TypeIntervention>;
  //listeTypeInterventions: Array<TypeIntervention>;
  unIntervention: Intervention = new Intervention(0, 0, 0, new Date(''));
  dateIntervention: Date;

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
  }

  ajouterIntervention(){
    this.unIntervention.idAnimal = this.unAnimal.id;
    this.unIntervention.dateIntervention = this.dateIntervention; //ne marche pas si je le mets direct dans unIntervention, je ne sais pas pourquoi
    console.table(this.unIntervention);
    this.modalController.dismiss(this.unIntervention, 'working');
  }
}
