import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
const PRODUCTOSURL = "http://localhost:3000/productos";
const PR_BUSCARNOMBREURL = "http://localhost:3000/productos?nombre="
const PR_DESDEPRECIOURL = "http://localhost:3000/productos?precio_gte="
const PR_DELETEURL = "http://localhost:3000/productos/"
const CAT_DELETEURL = "http://localhost:3000/categorias/"
const USR_DELETEURL = "http://localhost:3000/usuarios/"
const CATEGORIASURL = "http://localhost:3000/categorias";
const USUARIOSURL = "http://localhost:3000/usuarios";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) {
   }

   getProductos():Observable<Object>{
    return this.http.get(PRODUCTOSURL);
   }
   getCategorias():Observable<Object>{
    return this.http.get(CATEGORIASURL);
   }
   getUsuarios(){
    return this.http.get(USUARIOSURL);
   }
   getProductosDesde(precio:number):Observable<Object>{
    let cadena:string = PR_DESDEPRECIOURL + precio.toString();
    // if(!cadena.includes('.')) {
    //   cadena+= '.0';
    // }
    console.log(cadena);
    return this.http.get(cadena);
   }
   deleteProducto(id:number):Observable<unknown> {
    const url = `${PR_DELETEURL}/${id}`
    return this.http.delete(url, httpOptions)
      .pipe(catchError(this.handleError));
   }

  deleteCategoria(id:number):Observable<unknown> {
    const url = `${CAT_DELETEURL}/${id}`
    return this.http.delete(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteUsuario(id:number):Observable<unknown> {
    const url = `${USR_DELETEURL}/${id}`
    return this.http.delete(url, httpOptions)
      .pipe(catchError(this.handleError));
  }
   crearProducto(producto:Producto):Observable<Object>{
    return this.http.post<Producto>(PRODUCTOSURL, producto, httpOptions);
   }
   updateProducto(producto:Producto):Observable<Object>{
    const url = `${PRODUCTOSURL}/${producto.id}`;
    return this.http.put<Producto>(url, producto, httpOptions);
   }

  updateUsuario(usuario:Usuario):Observable<Object>{
    const url = `${USUARIOSURL}/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario, httpOptions);
  }

  updateCategoria(categoria:Categoria):Observable<Object>{
    const url = `${CATEGORIASURL}/${categoria.id}`;
    return this.http.put<Categoria>(url, categoria, httpOptions);
  }

   private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

export interface Producto {
  id: number,
  nombre: string,
  precio: number,
  categoria: number
}

export interface Categoria {
  id: number,
  nombre: string
}

export interface Usuario {
  id: 2,
  nombre: string,
  resultado: any[],
  passwd: string
}
