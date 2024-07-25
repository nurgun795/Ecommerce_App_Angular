import { Component } from '@angular/core';
import { CartapiService } from '../../services/cartapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private cartApi: CartapiService) {}

  getCartItemCount(): number {
    return this.cartApi.getCartItemCount();
  }
}
