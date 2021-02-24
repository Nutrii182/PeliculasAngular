import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  busqueda: string;
  movies: Movie[] = [];

  constructor(private activatedRoute: ActivatedRoute, private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      this.busqueda = params.texto;

      this.peliculasService.buscarPelicula(params.texto).subscribe(movies => {
        this.movies = movies;
      });
    });
  }

}
