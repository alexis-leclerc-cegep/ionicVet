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
    loadChildren: () => import('./ajouter-client/ajouter-client.module').then( m => m.AjouterClientPageModule)
  },
  {
    path: 'ajouter-client',
    loadChildren: () => import('./modal/ajouter-client/ajouter-client.module').then( m => m.AjouterClientPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
