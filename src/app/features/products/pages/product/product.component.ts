import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, mergeMap } from 'rxjs/operators';

import { Product } from 'src/app/data/models/product.model';
import { HeaderService } from 'src/app/core/services/header.service';
import { CartService } from 'src/app/data/services/cart.service';
import { TrackService } from 'src/app/data/services/track.service';
import { ProductService } from 'src/app/data/services/product.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: string = '';
  product!: Product;
  quantity: number = 0;

  constructor(
    private route: ActivatedRoute,
    private skus: ProductService,
    private location: Location,
    private router: Router,
    private header: HeaderService,
    private cart: CartService,
    private track: TrackService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.route.paramMap
      .pipe(
        mergeMap(params => {
          const id = params.get('id')
          this.id = id ? id : '';

          return this.skus.getProduct(this.id);
        }),
        map((sku) => {
          this.product = sku;
        })
      ).subscribe({
        error: (err) => this.router.navigateByUrl('/error')
      });


    this.header.setHeaderButtonsVisibility(true);
  }

  addItemToCart() {
    // id:string  =  this.route.snapshot.paramMap.get('id');
    if(this.quantity > 0){
        this.id = this.route.snapshot.paramMap.get('id') || '',
      this.cart.createLineItem({

        productId: this.id ,
        user: "61acb0778653ca6de7a3e4fd"

      }).subscribe(
        ()=> {
          
          this.track.incrementItemCount( this.quantity );
          this.showSuccessSnackBar();
        
        },
        err => this.showErrorSnackBar()

      );

    }else{
      this.snackBar.open('Select a quantity greater than 0.', 'Close', { duration: 8000 });
    }
  }

  setQuantity(no: number) {
    this.quantity = no;
  }

  goBack() {
    this.location.back();
  }
  private showSuccessSnackBar() {
    this.snackBar.open('Item successfully added to cart.', 'Close', { duration: 8000 });
  }

  private showErrorSnackBar() {
    this.snackBar.open('Failed to add your item to the cart.', 'Close', { duration: 8000 });
  }

}
