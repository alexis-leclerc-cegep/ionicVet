import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-liste-animaux',
  templateUrl: './liste-animaux.page.html',
  styleUrls: ['./liste-animaux.page.scss'],
})
export class ListeAnimauxPage implements OnInit {
  @Input() unClient: Client;

  constructor(public router: Router,
              public clientService: ClientService) { }

  ngOnInit() {
    this.unClient = this.clientService.getClient();
  }

}
