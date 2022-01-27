import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

//import { Order } from 'src/app/data/models/order.model';
import { OrderService } from 'src/app/data/services/order.service';
import { CartService } from 'src/app/data/services/cart.service';
import { Cart } from 'src/app/data/models/cart.model';


@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public carts!: Observable<Cart>;
  public  idForCart: any;
  public  total:any;
  email = new FormControl('', [Validators.required, Validators.minLength(3)]);
  paymentId: string = '';
 

  constructor(
    private orders: OrderService,
    private cart: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private storage: LocalStorageService
  ) { }

  ngOnInit(): void {

    this.carts = this.cart.getLineItem('61f13f7eed0e38d42f651607');

    this.cart.getCartId()
    .subscribe(
      data => {
        this.idForCart = data
      },
     
      err => this.snackBar.open('Something went wrong failed to retrieve  order  ', 'Close', { duration: 8000 })
    )
    this.total = this.storage.getItem('item-count');

  }
  //order
  addCustomerEmail() {
    this.snackBar.open('Address -  '+ this.email.value, 'Close', { duration: 8000 });
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
    const lengthOfCode = 6;
    this.paymentId    = this.makeRandom(lengthOfCode, possible);

    this.orders.createOrder({

      
      user: "61acb0778653ca6de7a3e4fd",
      address: this.email.value,
      paymentId: this.paymentId

    }).subscribe(
      ()=> {
        
     // //  this.track.incrementItemCount( this.quantity );
        this.snackBar.open('Order submited and will be proccessed', 'Close', { duration: 8000 });
      
      },
      err => this.snackBar.open('Something went wrong failed to submit order  ', 'Close', { duration: 8000 })

    );
    
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

}
