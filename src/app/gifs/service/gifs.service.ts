import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchResponse } from "../interfaces/gifs.intarfaces";

@Injectable({providedIn: 'root'})
export class GifsService {
  public gifsList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private GIPHY_API_KEY: string = 'XPlAK0IfYSXKM3AhFJ7rrTbUTAoJUxbA';
  private serviceUrl: string ='https://api.giphy.com/v1/gifs';
  constructor(private http: HttpClient){
    this.loadLocalStorage();
  }
  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string):void{
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)){

      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0,10);
    this.saveLocalStorage();
  }
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this.tagsHistory))
  }
  private loadLocalStorage(): void {
    if (!localStorage.getItem('history') ) {
      return;
    }
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!) ;
    if (this._tagsHistory.length === 0) {
      return;
    }
    this.searchTag(this._tagsHistory[0]);
  }

  async searchTag(tag: string):Promise< void>{
    if (tag.length === 0) {
      return;
    }
    const params = new HttpParams()
    .set('api_key', this.GIPHY_API_KEY)
    .set('limit', 10)
    .set('q', tag);

    this.organizeHistory(tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe(resp => {
      console.log(resp.data);
      this.gifsList = resp.data;
    });

  }
}
