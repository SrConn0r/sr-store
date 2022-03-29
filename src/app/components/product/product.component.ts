import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Product} from '../../models/product.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Output() addedProduct = new EventEmitter<Product>();
  @Input() product: Product ={
    id: '',
    price: 0,
    image: '',
    title: '',
    description: '',
    category: '',
  }

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(){
    this.addedProduct.emit(this.product);
  }

}
