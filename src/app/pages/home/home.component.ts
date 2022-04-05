import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  productChoosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category: {
      id: '',
      name: '',
    },
  };
  limit: number = 10;
  offset: number = 0;
  productId: string | null = null;

  constructor(
    private productService : ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productService.getProductsByPage(this.limit, this.offset).subscribe(data => {
      this.products = data;
      this.offset += this.limit;
    });
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
      console.log(this.productId);
    });
  }

  onLoadMore(){
    this.productService.getProductsByPage(this.limit, this.offset).subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
