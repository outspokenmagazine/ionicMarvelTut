import { Component } from '@angular/core';
import { ApiWrapperCharaterResponse, Character, MarvelapiService } from '../services/marvelapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  apiResult!: ApiWrapperCharaterResponse;
  characters: Character[] = [];

  offset: number  = 0;
  limit: number = 5;



  constructor(private marvelapi: MarvelapiService) {}


  ngOnInit() {
    this.loadCharacters(this.offset, this.limit);
  }




  loadMore(){
    this.loadCharacters(this.offset+this.limit, this.limit);
  }

  loadCharacters(offset: number, limit: number) {
    this.marvelapi.getCharacters(offset,limit).subscribe({
      next: (res: ApiWrapperCharaterResponse) => {
        this.apiResult = res;
        console.log(this.apiResult.data.results);

        // this.characters = this.apiResult.data.results;

        this.apiResult.data.results.forEach(receivedCharacter => {
          console.log(receivedCharacter);
          this.characters.push(receivedCharacter);
        });

        this.offset = this.offset + this.limit;
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
