import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total: number = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2021, 8, 16);

  constructor(
    private storeService : StoreService,
    private productService : ProductsService
  ) {
    this.myShoppingCart = storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product){
    console.log(product);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

}
