import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { NotificationService } from './notificaion.service';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  private cartItems: Product[] = [];
  private storageKey = 'cartItems';
  constructor(private http: HttpClient, private notificationService: NotificationService) { }


  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity +=1;
      this.notificationService.showSuccess(`${product.title} already in the cart.
        Quantity Updated: ${existingItem.quantity}`);
  } else {
    product.quantity = 1;
    this.cartItems.push(product);
    this.notificationService.showSuccess(`${product.title} added in the cart`);
  }

  localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
 }


 getCartItemCount(): number {
  return this.cartItems.length;
 }

 getCartItems(): Product[] {
    return this.cartItems;
 }

 removeCartItem(product: Product) : void {
  const index = this.cartItems.findIndex(item => item.id === product.id);

  if (index != -1) {
    this.cartItems.splice(index, 1);
    this.notificationService.showSuccess('Product removed from the cart');
  }
 }
}
