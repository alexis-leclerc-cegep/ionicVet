import { Component } from '@angular/core';
import { Client } from '../model/client';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public client : Client) {}

  naviguerClient(id : number){

  }
}
