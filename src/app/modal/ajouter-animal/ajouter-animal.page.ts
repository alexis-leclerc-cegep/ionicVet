import { Component, OnInit } from '@angular/core';
import { Animal } from '../../model/animal';

@Component({
  selector: 'app-ajouter-animal',
  templateUrl: './ajouter-animal.page.html',
  styleUrls: ['./ajouter-animal.page.scss'],
})
export class AjouterAnimalPage implements OnInit {
  animal: Animal = new Animal(0, '', 0, 0, new Date());

  constructor() {
  }

  ngOnInit() {
  }

  ajouterAnimal(){ }

}
