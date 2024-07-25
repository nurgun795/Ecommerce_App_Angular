import { Component } from '@angular/core';
import { Product } from '../../models/Product';
import { CartapiService } from '../../services/cartapi.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Product[] = [];
  totalAmout: number = 0;

  constructor(private cartApi: CartapiService) {}

  ngOnInit() {
    this.cartItems = this.cartApi.getCartItems();
    this.calculateTotalAmount();
  }


  calculateTotalAmount() {
    this.totalAmout = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  removeProduct(product: Product) : void{
    this.cartApi.removeCartItem(product);
    this.calculateTotalAmount();
  }
}
