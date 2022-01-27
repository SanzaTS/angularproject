import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {


  private cart = new BehaviorSubject({
    orderId: this.orderId,
    itemCount: this.itemCount
  }); 
  
  cartValue = this.cart.asObservable();
 
  constructor(private storage: LocalStorageService) { }

  get orderId(): string {
    const id = this.storage.getItem('order-id');
    return id ? id : '';
  }

  set orderId(id: string) {
    id = '61acb0778653ca6de7a3e4fd';
    this.storage.addItem('order-id', id);
    this.cart.next({ orderId: id, itemCount: this.itemCount });
  }

  get itemCount(): number {
    const itemCount = this.storage.getItem('item-count');

    return itemCount ? parseInt(itemCount) : 0;
  }

  set itemCount(amount: number) {
    this.storage.addItem('item-count', amount.toString());
    this.cart.next({ orderId: this.orderId, itemCount: amount });
  }

  incrementItemCount(amount: number) {
    this.itemCount = this.itemCount + amount;
  }

  decrementItemCount(amount: number) {
    this.itemCount = this.itemCount - amount;
  }

  clearCart() {
    this.storage.deleteItem('item-count');
    this.cart.next({ orderId: '', itemCount: 0 });
  }

  
}
