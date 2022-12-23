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
    path: 'characterdetails',
    loadChildren: () => import('./characterdetails/characterdetails.module').then( m => m.CharacterdetailsPageModule)
  },
  {
    path: 'characterdetails/:characterId',
    loadChildren: () => import('./characterdetails/characterdetails.module').then( m => m.CharacterdetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
