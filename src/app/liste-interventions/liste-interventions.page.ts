import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../model/animal';
import { Router } from '@angular/router';
import { AnimalService } from '../service/animal.service';
import { TypeIntervention} from '../model/type-intervention';
import { TypeInterventionService } from '../service/type-intervention.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AjouterAnimalPage} from '../modal/ajouter-animal/ajouter-animal.page';
import { Intervention } from '../model/intervention';
import { InterventionService } from '../service/intervention.service';

@Component({
  selector: 'app-liste-animaux',
  templateUrl: './liste-animaux.page.html',
  styleUrls: ['./liste-animaux.page.scss'],
})
export class ListeInterventionsPage implements OnInit {
  modal: any;
  unAnimal: Animal;
  listeAnimalTemporaire: Array<Animal>;
  listeInterventions: Array<Animal>;
  listeTypeInterventions: Array<TypeIntervention>;

  constructor(public router: Router,
              public clientService: AnimalService,
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
    });

    this.typeInterventionService.obtenirListeTypeInterventions().subscribe((response) => {
      this.listeTypeInterventions = response as Array<TypeIntervention>;
      console.table(this.listeTypeInterventions);
    });

    this.interventionService.obtenirInterventionsAnimal(idAnimal).subscribe((response) => {
      this.listeInterventions = response as Array<Animal>;
      console.table(this.listeInterventions);
    });
    //this.obtenirInterventionsDuAnimal(idAnimal);

  }

  async obtenirInterventionsAnimal(idAnimal: number){
    this.interventionService.obtenirInterventionsAnimal(idAnimal).subscribe((response) => {
      this.listeInterventions = response as Array<Animal>;
      console.table(this.listeInterventions);
    });
  }

  async appelerModalAjouterAnimal(){
    this.modal = await this.modalController.create(
      {
        component: AjouterAnimalPage,
        componentProps: {unAnimal: this.unAnimal, listeTypeInterventions: this.listeTypeInterventions}
      });
    this.modal.present();
    this.modal.onDidDismiss().then(async retour => {
      if (retour.role === 'working') {
        await this.animalService.ajouterAnimal(retour.data);
        await this.afficherToast('Ajout fait avec succès', 'primary');
        await this.obtenirInterventionsAnimal(this.unAnimal.id);
      } else {
        await this.afficherToast('Ajout échoué', 'danger', 3000);
      }
    });
  }

  obtenirTypeIntervention(idTypeIntervention: number){
    const result = this.listeTypeInterventions.filter(typeIntervention => typeIntervention.id === idTypeIntervention);
    return result[0].intervention;
  }

  async supprimerAnimal(uneIntervention: Animal){
    await this.animalService.supprimerAnimal(uneIntervention);
    await this.obtenirInterventionsAnimal(this.unAnimal.id);
  }


  retour(){
    this.router.navigateByUrl('/home');
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
