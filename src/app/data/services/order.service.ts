import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';

import { Order } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = 'http://localhost:9000/order';

  constructor(  
      private http: HttpClient,
    private eh: HttpErrorHandlerService) { }

    createOrder(order:Order): Observable<Order>{ 

      return this.http.post<Order>(this.url, order)
      .pipe(catchError(this.eh.handleError));
    }

}
