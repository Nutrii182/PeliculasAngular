import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  swiper: Swiper;

  constructor() { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onSlideNext(){
    this.swiper.slideNext();
  }

  // tslint:disable-next-line: typedef
  onSlidePrev(){
    this.swiper.slidePrev();
  }

}
