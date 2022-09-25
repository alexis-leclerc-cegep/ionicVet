import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.page.html',
  styleUrls: ['./ajouter-client.page.scss'],
})
export class AjouterClientPage implements OnInit {
  client: Client = new Client(0, '', '', '', '');

  constructor(public router: Router, public clientService: ClientService, public geolocation: Geolocation) { }

  ngOnInit(): void { }



  async ajouterClient(){
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.client.geolocalisation = resp.coords.latitude + ', ' + resp.coords.longitude;
      this.clientService.ajouterClient(this.client);
      this.router.navigate(['home']);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    console.log(this.client);
  }

}
