import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  cargando = false;

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  get params() {
    return {
      api_key: '4ca37625da28dedd7eadaecc54613217',
      language: 'es-ES',
      page: this.carteleraPage.toString(),
    };
  }

  // tslint:disable-next-line: typedef
  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  // tslint:disable-next-line: typedef
  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }

    this.cargando = true;

    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }

  buscarPelicula(texto: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: texto };

    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
        params,
      })
      .pipe(map((res) => res.results));
  }

  // tslint:disable-next-line: typedef
  getPeliculaDetalle(id: number) {
    return this.http
      .get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
        params: this.params,
      })
      .pipe(catchError((err) => of(null)));
  }

  // tslint:disable-next-line: typedef
  getCast(id: number): Observable<Cast[]> {
    return this.http
      .get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.cast),
        catchError((err) => of(null))
      );
  }
}
