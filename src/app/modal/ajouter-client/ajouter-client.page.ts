import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.page.html',
  styleUrls: ['./ajouter-client.page.scss'],
})
export class AjouterClientPage implements OnInit {
  client : Client = new Client(0, "", "", "", 0, 0);

  constructor(public router : Router) {

  }

  ngOnInit() {
  }

  ajouterClient(){}

}