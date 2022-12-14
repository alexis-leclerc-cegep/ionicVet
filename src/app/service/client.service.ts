/*
 * Auteur : Alexis Leclerc
 * Date : 2022-09-30
 * Usage : Service client
 * Version : 0.1
 */
import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  listeClients: Array<Client>;
  unClient: Client;

  apiGestionClients = 'http://localhost:8080/api/api_gestionClients.php';

  constructor(public httpClient: HttpClient) {
    this.listeClients = new Array<Client>();
    this.unClient = new Client(0, '', '', '', '');
  }

  setClient(unClient: Client) {
    this.unClient = unClient;
  }

  getClient() {
    return this.unClient;
  }

  obtenirLesClients(){
    return this.httpClient.get(this.apiGestionClients + '?action=obtenirLesClients');
  }
  async modifierClient(unClient: Client) {
    {
      console.log(this.apiGestionClients + '?action=modifierClient&id=' + unClient.id + '&nom=' + unClient.nom + '&prenom=' +
        unClient.prenom + '&telephone=' + unClient.telephone + '&geolocalisation=' + unClient.geolocalisation);
      this.httpClient.get(this.apiGestionClients + '?action=modifierClient&id=' + unClient.id + '&nom=' + unClient.nom + '&prenom=' +
        unClient.prenom + '&telephone=' + unClient.telephone + '&geolocalisation=' + unClient.geolocalisation).subscribe(
        (response: any) => {
          if (response.reponse.includes('working')) {
            console.log('Le client a été modifié');
            return true;
          } else {
            console.log('Le client n\'a pas été modifié');
            return false;
          }
        }
      );
      return false;
    }

  }

  async ajouterClient(unClient: Client) {
    return this.httpClient.get(this.apiGestionClients + '?action=ajouterClient&nom=' + unClient.nom + '&prenom=' +
      unClient.prenom + '&telephone=' + unClient.telephone + '&geolocalisation=' + unClient.geolocalisation);
  }

    async supprimerClient(unClient: Client) {
      return this.httpClient.get(this.apiGestionClients + '?action=supprimerClient&id=' + unClient.id);
    }

    obtenirClient(id: number) {
      console.log(this.apiGestionClients + '?action=obtenirClient&id=' + id);
      return this.httpClient.get(this.apiGestionClients + '?action=obtenirClient&id=' + id);
    }


}
