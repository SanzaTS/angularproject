import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductComponent } from './pages/product/product.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'product/:id', component: ProductComponent },
      { path: '', component: ProductListComponent }
    ]),
    CommonModule,
    LayoutModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    SharedModule
  ]
})
export class ProductsModule { }
