import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { mergeMap } from 'rxjs/operators';

import { TrackService } from 'src/app/data/services/track.service';
import { CartService } from 'src/app/data/services/cart.service';
import { Cart } from 'src/app/data/models/cart.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';


@UntilDestroy({ checkProperties: true  })
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {


  public carts!: Observable<Cart>;
  idForCart: any;
  public  total:any;
  constructor(
    private track:TrackService,
    private cart:CartService,
    private snackBar: MatSnackBar,
    private router: Router,
    private storage: LocalStorageService
  ) { }

  ngOnInit(): void {

    this.carts = this.cart.getLineItem('61f13f7eed0e38d42f651607');

    this.total = this.storage.getItem('item-count');

    this.cart.getCartId()
    .subscribe(
      data => {
        this.idForCart = data
      },
      err=> this.showOrderError('retrieving cart id')
    )

    /*this.cart.getLineItem('61f13f7eed0e38d42f651607')
    .subscribe(
      err => this.showOrderError('retrieving your cart')
    );*/
  }

 /* getId(){
    this.cart.getCartId()
    .subscribe(
      data => {
        this.idForCart = data
      },
      err=> this.showOrderError('retrieving cart id')
    )
  }*/

  private showOrderError(msg: string) {
    this.snackBar.open(`There was a problem ${msg}.`, 'Close', { duration: 8000 });
  }

  checkout() {
    this.router.navigateByUrl('/order');
    //this.snackBar.open(`Checkout page coming soon.`, 'Close', { duration: 8000 });
  }
  deleteLineItem(id: string){
    this.snackBar.open(`Delete action coming soon.`, 'Close', { duration: 8000 });
  }

}
