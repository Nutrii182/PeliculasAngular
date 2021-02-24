import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  url = 'https://image.tmdb.org/t/p/w500';

  transform(poster: string): string {

    if (!poster){
      return './assets/no-image.jpg';
    }
    return this.url + poster;
  }

}
