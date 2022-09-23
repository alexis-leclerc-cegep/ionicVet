import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  listeClients: Array<Client>;
  unClient : Client;

  API_gestionClients : string="http://localhost:8080/api/api_gestionClients.php";

  constructor(public httpClient : HttpClient) { 
    this.listeClients = new Array<Client>();
    this.unClient = new Client(0, "", "", "", "");
  }

  obtenirLesClients(): Array<Client>{
    this.httpClient.get(this.API_gestionClients+"?action=obtenirLesClients").subscribe(
      (response : any) => {
        this.listeClients = response as Array<Client>;
        console.table(this.listeClients);
      },
      (error : any) => {
        console.log(error);
      }
    );
    return this.listeClients;
  }

  ajouterClient(unClient:Client)
  {
    this.httpClient.post(this.API_gestionClients+"?action=ajouterClient", unClient).subscribe(
      (response : any) => {
        this.unClient = response as Client;
      },
      (error : any) => {
        console.log(error);
      }
    );
  }

}