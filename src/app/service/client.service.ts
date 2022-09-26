import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  listeClients: Array<Client>;
  unClient: Client;

  apiGestionClients: string='http://localhost:8080/api/api_gestionClients.php';

  constructor(public httpClient: HttpClient) {
    this.listeClients = new Array<Client>();
    this.unClient = new Client(0, '', '', '', '');
  }

  obtenirLesClients(): Array<Client>{
    this.httpClient.get(this.apiGestionClients+'?action=obtenirLesClients').subscribe(
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

  ajouterClient(unClient: Client): boolean
  {
    this.httpClient.post(this.apiGestionClients+'?action=ajouterClient', unClient).subscribe(
      (response: any) => {
        this.unClient = response as Client;
        return true;
      },
      (error: any) => {
        console.log(error);
        return false;
      }
    );
    return false;
  }

}
