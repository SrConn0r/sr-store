import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total: number = 0;

  products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: 'https://source.unsplash.com/collection/190726/1600x900'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: 'https://source.unsplash.com/collection/190725/1600x900'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: 'https://source.unsplash.com/collection/190728/1600x900'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: 'https://source.unsplash.com/collection/190723/1600x900'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddToShoppingCart(product: Product){
    console.log(product);
    this.myShoppingCart.push(product);
    this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

}
