# ionicMarvelTut
https://developer.marvel.com/docs

Tutorial for connecting an ionic app to the marvel API



>> % ionic start ionicMarvelAPItut blank
>> select Angular as the Framework
>> % npm i crypto-js
>> % npm i --save-dev @types/crypto-js
>> open environment.ts

populate it like this:

export const environment = {
  production: false,
  apiKey: 'yourAPIPubkey',
  apiSecret: 'yourAPIPrivKey',
  apiUrl: 'https://gateway.marvel.com/v1/public/'
};


>> % ionic g service services/marvelapi
>> open marvelapi.service.ts


populate it like this:

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MD5 } from 'crypto-js';



@Injectable({
  providedIn: 'root'
})

export class MarvelapiService {


  constructor(
    private http: HttpClient
  ) {  }



}

>> now make yourself familiar with the repsonse of the webservice (interactive documentation) and build the necessary type declarations as interface
    export interface ApiWrapperCharaterResponse{
        to be filled by you 
    }

    export interface Character{
        to be filled by you 
    }


    export interface Bundlestructur{
       you may have noticed that some types have the same genereic subtypestructure
       for tidying up purpose we will define a generic type for that called 
       bundlestructure
    }

    export interface Item {
        to be filled by you 
    }


>>   provide the getCharacters() function to your marvelapi.service.ts like this
getCharacters(): Observable<ApiWrapperCharaterResponse> {
    return this.http.get<ApiWrapperCharaterResponse>(
      `${environment.apiUrl}characters?apikey=${environment.apiKey}`
    );
  }


>> open the home.page.ts and enrich it like this
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

>> % ionic serve
>> fix the Nullpointer exception Error by opening the app.module.ts and change the imports section to
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],

>> add this to the imports at the top as well
import { HttpClientModule } from '@angular/common/http';


>> now lets fix the UNAUTHORIZED error, since the marvel api wants to see more attributes in the webservice call than they told us. They want to see a hash variable as well as a ts (timestamp) variable

>> open marvelapi.service.ts and add this to the http.get call inside the getCharacters function 
&hash=${this.hash}&ts=${this.ts}

>> the hash variable needs to be populated within the constructor like this
this.hash = MD5( this.ts + environment.apiSecret + environment.apiKey );

>> the ts variable needs to be populated like this (classic dateTime initialization)
ts = new Date().getTime();

>> you should see the result in the webdevelopers console
>> lets show this result in the UI
>> open home.page.html and populate the ion-content section like this
  <ion-list>
    <ion-item button *ngFor="let character of characters">
      <ion-avatar slot="start">
        <img [src]="character.thumbnail.path + '.' + character.thumbnail.extension" />
      </ion-avatar>

      <ion-label class="ion-text-wrap">
        <h3>{{ character.name }}</h3>
        <p>{{ character.description}}</p>
      </ion-label>

      <ion-badge slot="end"> {{ character.comics.available }} </ion-badge>
    </ion-item>
  </ion-list>








