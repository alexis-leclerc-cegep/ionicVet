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

  obtenirLesClients(): Array<Client> {
    this.httpClient.get(this.apiGestionClients + '?action=obtenirLesClients').subscribe(
      (response: any) => {
        this.listeClients = response as Array<Client>;
        console.table(this.listeClients);
      },
      (error: any) => {
        console.log(error);
      }
    );
    return this.listeClients;
  }

  async ajouterClient(unClient: Client): Promise<boolean> {
    {
      console.log(unClient.nom);
      console.log(this.apiGestionClients + '?action=ajouterClient&nom=' + unClient.nom + '&prenom=' +
        unClient.prenom + '&telephone=' + unClient.telephone + '&geolocalisation=' + unClient.geolocalisation);
      this.httpClient.get(this.apiGestionClients + '?action=ajouterClient&nom=' + unClient.nom + '&prenom=' +
        unClient.prenom + '&telephone=' + unClient.telephone + '&geolocalisation=' + unClient.geolocalisation).subscribe(
        (response: any) => {
          if (response.reponse.includes('working')) {
            console.log('Le client a été ajouté');
            return true;
          } else {
            console.log('Le client n\'a pas été ajouté');
            return false;
          }
        }
      );
      return false;
    }

  }
}
