import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { Cart } from '../models/cart.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
}) 
export class CartService {

  private url: string =  `${environment.apiUrl}/cart`;
 

  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) { }

  createLineItem(cart: Cart) : Observable<Cart> {

    return this.http.post<Cart> (this.url, cart)
    .pipe(catchError(this.eh.handleError));
  }

  getLineItem(id:string): Observable<Cart> {
    return this.http.get<Cart>(`${this.url}/${id}`)
    .pipe(catchError(this.eh.handleError))
  }

  getCartId(): Observable<Cart> {
    return this.http.get<Cart>(this.url)
    .pipe(catchError(this.eh.handleError))
  }

}
