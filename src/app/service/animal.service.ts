import { Injectable } from '@angular/core';
import { Animal } from '../model/animal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  listeAnimaux: Array<Animal>;
  unAnimal: Animal;

  apiGestionAnimaux = 'http://localhost:8080/api/api_gestionAnimaux.php';

  constructor(public httpClient: HttpClient) {
    this.listeAnimaux = new Array<Animal>();
    this.unAnimal = new Animal(0, '', 0, 0, new Date());
  }

  obtenirAnimauxDuClient(idClient: number) {
    return this.httpClient.get(this.apiGestionAnimaux + '?action=obtenirAnimauxDuClient&idClient=' + idClient);
  }
}
