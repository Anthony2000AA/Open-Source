import { HttpClient , HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';

@Injectable({
  providedIn: 'root'
})

export class HttpDataService {
base_URL = "http://localhost:3000/Peliculas"

  constructor( private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

handleError(error: HttpErrorResponse){
  if(error.error instanceof ErrorEvent){
    console.log(`An error occurred ${error.status}, body was: ${error.error}`);
  }else{
    console.log(`Backend returned cod ${error.status}, body was: ${error.error}`);

  }
  return throwError('Something happend with request, try again');

  };



  getList(): Observable<Pelicula>{
    return this.http.get<Pelicula>(this.base_URL)
    .pipe(retry(2), catchError(this.handleError));
  }

  getItem (id:string): Observable<Pelicula>{
    return this.http.get<Pelicula>(`${this.base_URL}/${id}`)///ACAAAAAAAAAAAAAAAAAAAAAAAAAAAA ESTABA EL ERROR, FALTABA UN }
    .pipe(retry(2), catchError(this.handleError));
  }


//UPDATE
  updateItem(id:string, item:any): Observable<Pelicula>{
    return this.http.put<Pelicula>(`${this.base_URL}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }


//CREATE 
createItem(item:Pelicula): Observable<Pelicula>{
  return this.http.post<Pelicula>(this.base_URL, JSON.stringify(item), this.httpOptions)
  .pipe(retry(2), catchError(this.handleError));
}

//DELETE
deleteItem(id:string): Observable<Pelicula>{
  return this.http.delete<Pelicula>(`${this.base_URL}/${id}`, this.httpOptions)
  .pipe(retry(2), catchError(this.handleError));

}

}
