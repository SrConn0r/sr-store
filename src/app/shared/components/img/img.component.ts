import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() img: string ='';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://source.unsplash.com/collection/190727/1600x900';

  constructor() { }

  ngOnInit(): void {
  }

  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded(){
    this.loaded.emit(this.img);
  }
}
