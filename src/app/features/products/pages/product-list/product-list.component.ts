import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { UntilDestroy } from '@ngneat/until-destroy';

import { ProductService } from 'src/app/data/services/product.service';
import { Product } from 'src/app/data/models/product.model';
import { HeaderService } from 'src/app/core/services/header.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  cols = 4;

  length = 1;
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 20];

  pageEvent!: PageEvent | void;

  product: Product[] =[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private products : ProductService,
    private router: Router,
    private header: HeaderService
  ) { }

  ngOnInit(): void {
  }

  private getProducts(page: number, pageSize: number) {
    this.products.getProducts(page,pageSize)
    .subscribe(
      prod => {
        this.product = prod;
       //this.length = prod[0]._id.length;
    // prod[0].
      },
      err => this.router.navigateByUrl('/error')
    );
  }

  getNextPage(event: PageEvent){
    this.getProducts(event.pageIndex + 1, event.pageSize);
  }

  trackSkus(index:number, item: Product){
    return `${item._id}-${index}`;
  }

}
