import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/service/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private GifsService: GifsService){

  }

  get tags():string[]{
    return this.GifsService.tagsHistory;
  }

  searchTag(tag:string){
    console.log(tag);
    this.GifsService.searchTag(tag)

  }
}
