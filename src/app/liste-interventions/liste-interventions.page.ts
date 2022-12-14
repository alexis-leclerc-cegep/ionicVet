import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client';
import { Animal } from '../model/animal';
import { Router } from '@angular/router';
import { AnimalService } from '../service/animal.service';
import { TypeIntervention} from '../model/type-intervention';
import { TypeInterventionService } from '../service/type-intervention.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Intervention } from '../model/intervention';
import { InterventionService } from '../service/intervention.service';
import {AjouterInterventionPage} from '../modal/ajouter-intervention/ajouter-intervention.page';

@Component({
  selector: 'app-liste-animaux',
  templateUrl: './liste-interventions.page.html',
  styleUrls: ['./liste-interventions.page.scss'],
})
export class ListeInterventionsPage implements OnInit {
  modal: any;
  unAnimal: Animal;
  unClient: Client;
  listeAnimalTemporaire: Array<Animal>;
  listeClientTemporaire: Array<Client>; // doit etre utilisee pour parser la reponse
  listeInterventions: Array<Intervention>;
  listeTypeInterventions: Array<TypeIntervention>;

  constructor(public router: Router,
              public clientService: ClientService,
              public typeInterventionService: TypeInterventionService,
              public animalService: AnimalService,
              public activatedRoute: ActivatedRoute,
              public modalController: ModalController,
              public toastController: ToastController,
              public interventionService: InterventionService) {
    this.listeTypeInterventions = new Array<TypeIntervention>();
  }

  async ionViewWillEnter(){
    const idAnimal = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.animalService.obtenirAnimal(idAnimal).subscribe((response) => {
      this.listeAnimalTemporaire = response as Array<Animal>;
      this.unAnimal = this.listeAnimalTemporaire[0];
      console.log('recu le message');
      console.log(this.unAnimal);
      this.clientService.obtenirClient(this.unAnimal.idClient).subscribe((response2) => {
        this.listeClientTemporaire = response2 as Array<Client>;
        this.unClient = this.listeClientTemporaire[0];
        console.log('unclient');
        console.log(this.unClient);
      });
    });


    this.typeInterventionService.obtenirListeTypeInterventions().subscribe((response) => {
      this.listeTypeInterventions = response as Array<TypeIntervention>;
      console.log('liste type');
    });

    this.interventionService.obtenirInterventionsAnimal(idAnimal).subscribe((response) => {
      this.listeInterventions = response as Array<Intervention>;
      console.table(this.listeInterventions);
    });
    //this.obtenirInterventionsDuAnimal(idAnimal);

  }

  async obtenirInterventionsAnimal(idAnimal: number){
    this.interventionService.obtenirInterventionsAnimal(idAnimal).subscribe((response) => {
      this.listeInterventions = response as Array<Intervention>;
      console.table(this.listeInterventions);
    });
  }

  async appelerModalAjouterIntervention(){
    this.modal = await this.modalController.create(
      {
        component: AjouterInterventionPage,
        componentProps: {unAnimal: this.unAnimal, listeTypeInterventions: this.listeTypeInterventions}
      });
    this.modal.present();
    this.modal.onDidDismiss().then(async retour => {
      if (retour.role === 'working') {
        const uneIntervention: Intervention = retour.data as Intervention;
        console.log(uneIntervention.dateIntervention);
        if(uneIntervention.idTypeIntervention !== 0 && uneIntervention.dateIntervention !== undefined) {
          await this.interventionService.ajouterIntervention(retour.data);
          await this.afficherToast('Ajout fait avec succ??s', 'primary');
          await this.obtenirInterventionsAnimal(this.unAnimal.id);
        }
        else{
          await this.afficherToast('Le type d\'intervention ou la date n\'est pas valide', 'danger');
        }
      } else {
        await this.afficherToast('Ajout ??chou??', 'danger', 3000);
      }
    });
  }

  obtenirTypeIntervention(idTypeIntervention: number){
    const result = this.listeTypeInterventions.filter(typeIntervention => typeIntervention.id === idTypeIntervention);
    return result[0];
  }

  async supprimerIntervention(unIntervention: Intervention){
    (await this.interventionService.supprimerIntervention(unIntervention)).subscribe((response) => {
      this.obtenirInterventionsAnimal(this.unAnimal.id);
    });
  }


  retour(){
    this.router.navigate(['/liste-animaux', {id: this.unClient.id}]);
  }

  ngOnInit() {
  }

  sortirListe(){
    console.table(this.listeTypeInterventions);
  }

  async afficherToast(leMessage: string, laCouleur: string = 'primary', leTemps: number = 2000) {
    const toast = await this.toastController.create({color: laCouleur, duration:leTemps, message: leMessage});
    await toast.present();
  }
}
