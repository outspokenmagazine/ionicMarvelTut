import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharacterdetailsPageRoutingModule } from './characterdetails-routing.module';

import { CharacterdetailsPage } from './characterdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacterdetailsPageRoutingModule
  ],
  declarations: [CharacterdetailsPage]
})
export class CharacterdetailsPageModule {}
