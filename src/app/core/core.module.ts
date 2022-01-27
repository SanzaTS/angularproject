import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { MatBadgeModule } from '@angular/material/badge';



@NgModule({
  declarations: [
    HeaderComponent,
    ErrorComponent,
    NotFoundComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '404', component: NotFoundComponent },
      { path: 'error', component: ErrorComponent },
  //    { path: '**', redirectTo: '/404' }
    ]),
    CommonModule,
    MatBadgeModule,
    SharedModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
