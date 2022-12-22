
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MD5 } from 'crypto-js';


export interface ApiWrapperCharaterResponse{
  attributionHTMl: string;
  attributionText: string;
  code: number;
  copyright: string;
  data: {
    count: number;
    limit: number;
    offset: number;
    results: Character[];
    total: number;
  };
  etag: string;
  status: string;


}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: Date;
  thumbnail: {
      path: string;
      extension: string;
  }
  resourceURI: string;
  comics: BundleStructure;
  series: BundleStructure;
  stories: BundleStructure;
  events: BundleStructure;
  urls: {
    type: string;
    url: string;
  }[];
  }

  export interface BundleStructure {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
  }

  export interface Item {
    resourceURI: string;
    name: string;
  }

@Injectable({
  providedIn: 'root'
})

export class MarvelapiService {
  hash!: any;
  ts = new Date().getTime();

  constructor(
    private http: HttpClient
  ) {
  this.hash = MD5( this.ts + environment.apiSecret + environment.apiKey );
  }

  getCharacters(offset: number,limit: number ): Observable<ApiWrapperCharaterResponse> {
    return this.http.get<ApiWrapperCharaterResponse>(
      `${environment.apiUrl}characters?apikey=${environment.apiKey}&hash=${this.hash}&ts=${this.ts}&offset=${offset}&limit=${limit}`
    );
  }

}
