import { Component, OnInit, Input } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Movie[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onMovieClick(movie: Movie){
    this.router.navigate(['/pelicula', movie.id]);
  }

}
