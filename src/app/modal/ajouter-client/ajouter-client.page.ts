import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.page.html',
  styleUrls: ['./ajouter-client.page.scss'],
})
export class AjouterClientPage implements OnInit {
  client : Client = new Client(0, "", "", "", "");

  constructor(public router : Router, public clientService : ClientService) { }

  }

  ngOnInit() {
  }

  ajouterClient(){}

}