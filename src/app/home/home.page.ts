import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  limit: number = 8;



  constructor(
    private marvelapi: MarvelapiService,
    private router: Router
    ) {}


  ngOnInit() {
    this.loadCharacters(this.offset, this.limit);
  }




  loadMore(){
    this.loadCharacters(this.offset, this.limit);
  }

  loadCharacters(offset: number, limit: number) {
    this.marvelapi.getCharacters(offset,limit).subscribe({
      next: (res: ApiWrapperCharaterResponse) => {
        this.apiResult = res;
        console.log(this.apiResult.data.results);

        // this.characters = this.apiResult.data.results;

        this.apiResult.data.results.forEach(receivedCharacter => {
          console.log(receivedCharacter.thumbnail.path);
          if(!receivedCharacter.thumbnail.path.includes('image_not_available')){
            this.characters.push(receivedCharacter);
          }

        });

        this.offset = offset + limit;
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



  openCharacter(character: Character){
    console.log('Home Page log: ')
    console.log(character);
    console.log('Home Page log Option 1: '+ character.id);
    // Option 1
    this.router.navigate(['/characterdetails/' + character.id]);

    // Option 2
    this.marvelapi.currentCharacter = character;
  }



}
