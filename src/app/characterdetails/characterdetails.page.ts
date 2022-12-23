import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Character, MarvelapiService } from '../services/marvelapi.service';

@Component({
  selector: 'app-characterdetails',
  templateUrl: './characterdetails.page.html',
  styleUrls: ['./characterdetails.page.scss'],
})
export class CharacterdetailsPage implements OnInit {

characterId!: string | null;
character!: Character;

@Input() outputCharacter!: Character;


  constructor(
    private route: ActivatedRoute,
    private marvelApi: MarvelapiService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    // Option 1
    this.characterId = this.route.snapshot.paramMap.get('characterId');
    console.log('Character Details Page log Option 1: '+ this.characterId);

    // Option 2
    console.log('Character Details Page log Option 2: ');
    console.log(this.marvelApi.currentCharacter);
    this.character = this.marvelApi.currentCharacter;
  }

  goBack() {
    this.navCtrl.back();
  }

}
