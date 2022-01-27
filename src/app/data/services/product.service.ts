import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = 'http://localhost:9000/products';

  constructor(private http: HttpClient,private eh:HttpErrorHandlerService) { }

  getProduct(id:string) : Observable<Product> {

    return this.http.get<Product>(`${this.url}/${id}`)
    .pipe(catchError(this.eh.handleError));
  }

  getProducts(page: number, pageSize: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.url,
      {
        params: {
          'page': page.toString(),
          'pageSize': pageSize.toString()
        }
      }
    ).pipe(catchError(this.eh.handleError));


  }


}
