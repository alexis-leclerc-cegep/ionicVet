import { Injectable } from '@angular/core';
import { TypeAnimal } from '../model/type-animal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeAnimalService {
  listeTypeAnimaux: Array<TypeAnimal>;
  unTypeAnimal: TypeAnimal;

  apiGestionAnimaux = 'http://localhost:8080/api/api_gestionAnimal.php';

  constructor(public httpClient: HttpClient) {
    this.listeTypeAnimaux = new Array<TypeAnimal>();
    this.unTypeAnimal = new TypeAnimal(0, '');
  }

  async setListeTypeAnimaux(listeTypeAnimaux: Array<TypeAnimal>){
    this.listeTypeAnimaux = listeTypeAnimaux;
  }

  async getListeTypeAnimaux(){
    return this.listeTypeAnimaux;
  }


  obtenirListeTypeAnimaux() {
    console.log(this.apiGestionAnimaux + '?action=obtenirListeTypeAnimaux');
    return this.httpClient.get(this.apiGestionAnimaux + '?action=obtenirListeTypeAnimaux');
  }

}
