import { Injectable } from '@angular/core';
import { Intervention } from '../model/intervention';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  listeInterventions: Array<Intervention>;
  unIntervention: Intervention;

  apiGestionInterventions = 'http://localhost:8080/api/api_gestionInterventions.php';

  constructor(public httpClient: HttpClient) {
    this.listeInterventions = new Array<Intervention>();
    this.unIntervention = new Intervention(0, 0, 0, new Date());
  }

  obtenirInterventionsAnimal(idAnimal: number) {
    console.log(this.apiGestionInterventions + '?action=obtenirInterventionsAnimal&idAnimal=' + idAnimal);
    return this.httpClient.get(this.apiGestionInterventions + '?action=obtenirInterventionsAnimal&idAnimal=' + idAnimal);
  }

  async ajouterIntervention(unIntervention: Intervention) {
    console.log(this.apiGestionInterventions + '?action=ajouterIntervention' +
       '&idTypeIntervention=' + unIntervention.idTypeIntervention + '&idAnimal='
      + unIntervention.idAnimal + '&dateIntervention=' + unIntervention.dateIntervention);
    this.httpClient.get(this.apiGestionInterventions + '?action=ajouterIntervention&' +
       'idTypeIntervention=' + unIntervention.idTypeIntervention + '&idAnimal='
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
    return this.httpClient.get(this.apiGestionInterventions + '?action=supprimerIntervention&id=' + unIntervention.id);
  }
}
