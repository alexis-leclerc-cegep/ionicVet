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
    console.log(
    this.apiGestionAnimaux + '?action=ajouterAnimal&nom=' + unAnimal.nom
      + '&idTypeAnimal=' + unAnimal.idTypeAnimal + '&idClient='
      + unAnimal.idClient + '&dateNaissance=' + unAnimal.dateNaissance);
    this.httpClient.get(this.apiGestionAnimaux + '?action=ajouterAnimal&nom=' + unAnimal.nom
      + '&idTypeAnimal=' + unAnimal.idTypeAnimal + '&idClient='
      + unAnimal.idClient + '&dateNaissance=' + unAnimal.dateNaissance).subscribe(
        (response: any) => {
          if(response.reponse.includes('working')) {
            console.log('animal ajoute');
            return true;
          } else{
            return false;
          }
        }
    );
    return false;
  }

  async supprimerAnimal(unAnimal: Animal){
    this.httpClient.get(this.apiGestionAnimaux + '?action=supprimerAnimal&id=' + unAnimal.id).subscribe(
      (response: any) => {
        console.log(response);
        if(response.reponse.includes('working')) {
          console.log('animal supprime');
          return true;
        } else{
          return false;
        }
      }
    );
  }
}
