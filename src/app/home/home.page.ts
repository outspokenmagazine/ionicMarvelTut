import { Component } from '@angular/core';
import { ApiWrapperCharaterResponse, Character, MarvelapiService } from '../services/marvelapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  apiResult!: ApiWrapperCharaterResponse;
  characters!: Character[];


  constructor(private marvelapi: MarvelapiService) {}
  ngOnInit() {
    this.loadCharacters();
  }

  async loadCharacters() {
    this.marvelapi.getCharacters().subscribe(
      (res) => {
        this.apiResult = res;
        console.log(this.apiResult.data.results);
        this.characters = this.apiResult.data.results;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
