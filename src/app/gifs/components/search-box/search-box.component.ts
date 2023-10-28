import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../service/gifs.service';

@Component({
  selector: 'gifs-home-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
    @ViewChild('txtTagInput')
    tagInput!: ElementRef<HTMLInputElement>;

    constructor(private GifsService: GifsService){

    }

  searchTag():void{
    console.log(this.tagInput.nativeElement.value);
    const newTag = this.tagInput.nativeElement.value;
    this.GifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';

  }
}
