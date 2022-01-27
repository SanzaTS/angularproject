import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

import { SharedModule } from '../../shared/shared.module';

import { OrderComponent } from './pages/order/order.component';
import { EmptyCartGuard } from 'src/app/core/guards/empty-cart.guard';



@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [    RouterModule.forChild([
    {
      path: '', canActivate: [EmptyCartGuard], children: [
        { path: 'order', component: OrderComponent },

      ]
    }
  ]),
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatInputModule,
  MatMenuModule,
  MatRadioModule,
  ReactiveFormsModule,
  SharedModule,
    CommonModule
  ]
})
export class CheckoutModule { }
