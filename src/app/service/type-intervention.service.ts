import { Injectable } from '@angular/core';
import { TypeIntervention } from '../model/type-intervention';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeInterventionService {
  listeTypeInterventions: Array<TypeIntervention>;
  unTypeIntervention: TypeIntervention;

  apiGestionInterventions = 'http://localhost:8080/api/api_gestionInterventions.php';

  constructor(public httpClient: HttpClient) {
    this.listeTypeInterventions = new Array<TypeIntervention>();
    this.unTypeIntervention = new TypeIntervention(0, '');
  }

  async setListeTypeInterventions(listeTypeInterventions: Array<TypeIntervention>){
    this.listeTypeInterventions = listeTypeInterventions;
  }

  async getListeTypeInterventions(){
    return this.listeTypeInterventions;
  }


  obtenirListeTypeInterventions() {
    console.log(this.apiGestionInterventions + '?action=obtenirListeTypeInterventions');
    return this.httpClient.get(this.apiGestionInterventions + '?action=obtenirListeTypeInterventions');
  }

}
