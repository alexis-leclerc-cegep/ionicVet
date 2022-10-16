import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ajouter-client',
    loadChildren: () => import('./modal/ajouter-client/ajouter-client.module').then( m => m.AjouterClientPageModule)
  },
  {
    path: 'ajouter-animal',
    loadChildren: () => import('./modal/ajouter-animal/ajouter-animal.module').then( m => m.AjouterAnimalPageModule)
  },
  {
    path: 'ajouter-animal',
    loadChildren: () => import('./modal/ajouter-animal/ajouter-animal.module').then( m => m.AjouterAnimalPageModule)
  },
  {
    path: 'modifier-client',
    loadChildren: () => import('./modal/modifier-client/modifier-client.module').then( m => m.ModifierClientPageModule)
  },
  {
    path: 'liste-animaux',
    loadChildren: () => import('./liste-animaux/liste-animaux.module').then( m => m.ListeAnimauxPageModule)
  },
  {
    path: 'liste-animaux',
    loadChildren: () => import('./liste-animaux/liste-animaux.module').then( m => m.ListeAnimauxPageModule)
  },
  {
    path: 'liste-interventions',
    loadChildren: () => import('./liste-interventions/liste-interventions.module').then( m => m.ListeInterventionsPageModule)
  },
  {
    path: 'ajouter-intervention',
    loadChildren: () => import('./modal/ajouter-intervention/ajouter-intervention.module').then( m => m.AjouterInterventionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
