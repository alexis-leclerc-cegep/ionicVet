import { Injectable } from '@angular/core';
import { Intervention } from '../model/intervention';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  listeInterventions: Array<Intervention>;
  unIntervention: Intervention;

  apiGestionInterventions = 'http://localhost:8080/api/api_gestionIntervention.php';

  constructor(public httpClient: HttpClient) {
    this.listeInterventions = new Array<Intervention>();
    this.unIntervention = new Intervention(0, 0, 0, new Date());
  }

  obtenirInterventionsAnimal(idAnimal: number) {
    console.log(this.apiGestionInterventions + '?action=obtenirInterventionsDuClient&idClient=' + idAnimal);
    return this.httpClient.get(this.apiGestionInterventions + '?action=obtenirInterventionsDuClient&idClient=' + idAnimal);
  }

  async ajouterIntervention(unIntervention: Intervention) {
    this.httpClient.get(this.apiGestionInterventions + '?action=ajouterIntervention&' +
      + '&idTypeIntervention=' + unIntervention.idTypeIntervention + '&idAnimal='
      + unIntervention.idAnimal + '&dateIntervention=' + unIntervention.dateIntervention).subscribe(
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

  async supprimerIntervention(unIntervention: Intervention){
    this.httpClient.get(this.apiGestionInterventions + '?action=supprimerIntervention&id=' + unIntervention.id).subscribe(
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
