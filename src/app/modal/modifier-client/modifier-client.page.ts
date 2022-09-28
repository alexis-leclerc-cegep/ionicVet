import {Component, Input, OnInit} from '@angular/core';
import { Client } from '../../model/client';

@Component({
  selector: 'app-modifier-client',
  templateUrl: './modifier-client.page.html',
  styleUrls: ['./modifier-client.page.scss'],
})
export class ModifierClientPage implements OnInit {
  //unClientModel: Client = new Client(0, '', '', '', '');

  @Input() unClient: Client;

  constructor() { }

  ngOnInit() {
  }

  modifierClient(unClient: Client){
    console.log(unClient);
  }

}
