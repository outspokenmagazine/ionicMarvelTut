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
    this.marvelapi.getCharacters().subscribe({
      next: (res: ApiWrapperCharaterResponse) => {
        this.apiResult = res;
        console.log(this.apiResult.data.results);
        this.characters = this.apiResult.data.results;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })

/*example https://rxjs.dev/deprecations/subscribe-arguments

of([1,2,3]).subscribe({
  next: (v) => console.log(v),
  error: (e) => console.error(e),
  complete: () => console.info('complete')
})

*/


  }

}
