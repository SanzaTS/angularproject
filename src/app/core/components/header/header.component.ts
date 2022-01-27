import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy } from '@ngneat/until-destroy';
import { concat } from 'rxjs';
import { TrackService } from 'src/app/data/services/track.service';

/*import { CartService } from 'src/app/data/services/cart.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SessionService } from '../../services/session.service';*/

import { HeaderService } from '../../services/header.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartAmount: number = 0;

  isLoggedIn: boolean = false;
  showButtons: boolean = true;

  constructor(
 //   private session: SessionService,
    private snackBar: MatSnackBar,
    private cart: TrackService,
     private header: HeaderService,
  //  private auth: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.header.showHeaderButtons$.subscribe(visible => this.showButtons = visible);


   this.cart.cartValue.subscribe(cart => this.cartAmount = cart.itemCount);
  }

  logout(){
    this.snackBar.open('You have been logged out.', 'Close', { duration: 4000 });
  }
 
}
