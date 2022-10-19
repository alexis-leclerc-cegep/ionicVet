import { Injectable } from '@angular/core';
import { Animal } from '../model/animal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  listeAnimaux: Array<Animal>;
  unAnimal: Animal;

  apiGestionAnimaux = 'http://localhost:8080/api/api_gestionAnimal.php';

  constructor(public httpClient: HttpClient) {
    this.listeAnimaux = new Array<Animal>();
    this.unAnimal = new Animal(0, '', 0, 0, new Date());
  }

  obtenirAnimauxDuClient(idClient: number) {
    console.log(this.apiGestionAnimaux + '?action=obtenirAnimauxDuClient&idClient=' + idClient);
    return this.httpClient.get(this.apiGestionAnimaux + '?action=obtenirAnimauxDuClient&idClient=' + idClient);
  }

  async ajouterAnimal(unAnimal: Animal) {
    return this.httpClient.get(this.apiGestionAnimaux + '?action=ajouterAnimal&nom=' + unAnimal.nom
      + '&idTypeAnimal=' + unAnimal.idTypeAnimal + '&idClient='
      + unAnimal.idClient + '&dateNaissance=' + unAnimal.dateNaissance);
  }

  async supprimerAnimal(unAnimal: Animal){
    return this.httpClient.get(this.apiGestionAnimaux + '?action=supprimerAnimal&id=' + unAnimal.id);
  }


  obtenirAnimal(id: number) {
    console.log(this.apiGestionAnimaux + '?action=obtenirAnimal&id=' + id);
    return this.httpClient.get(this.apiGestionAnimaux + '?action=obtenirAnimal&id=' + id);
  }
}
