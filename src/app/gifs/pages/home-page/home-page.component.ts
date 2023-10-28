import { Component } from '@angular/core';
import { GifsService } from '../../service/gifs.service';
import { Gif } from '../../interfaces/gifs.intarfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  constructor(private gifsService:GifsService){

  }

  get gifs(): Gif[]{

    return this.gifsService.gifsList;
  }

}