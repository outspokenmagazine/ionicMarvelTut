import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterdetailsPage } from './characterdetails.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterdetailsPageRoutingModule {}
