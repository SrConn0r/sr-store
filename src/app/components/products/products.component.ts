import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

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
  showProductDetail: boolean = false;
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
  statusDetail: 'loading' | 'success' | 'error'  | 'init' = 'init';

  constructor(
    private storeService : StoreService,
    private productService : ProductsService
  ) {
    this.myShoppingCart = storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productService.gerProductsByPage(this.limit, this.offset).subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }


  readAndUpdate(id: string){
    // switchMap if you need to do something before the subscribe
    this.productService.getProduct(id)
    .pipe(
      switchMap((p)=> this.productService.update({title: 'change'}, p.id)
      )
    ).subscribe(x => {
      console.log(x);
    });
    // zip if you need to do 2 or more things at the same time
    zip(
      this.productService.getProduct(id),
      this.productService.update({title: 'nuevo'}, id)
    ).subscribe(x => {
      const product = x[0]; // first element of the array
      const updatedProduct = x[1]; // second element of the array
    });
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading';
    this.productService.getProduct(id).subscribe(product => {
      this.toggleProductDetail();
      this.productChoosen = product;
      this.statusDetail = 'success';
    }, error =>{
      console.log(error);
      this.statusDetail = 'error';
    });
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      price: 0,
      images: [''],
      title: 'Nuevo producto',
      description: ' bla bla bla',
      categoryId: 2,
    }
    this.productService.create(product).subscribe(x => {
      console.log(x);
      this.products.unshift(x);
    });
  }

  updateProduct(){
    const changes: UpdateProductDTO ={
      title : 'Nuevo titulo'
    }
    const id = this.productChoosen.id;
    this.productService.update(changes, id).subscribe(x => {
      const productIndex = this.products.findIndex(p => p.id === id);
      this.products[productIndex] = x;
      this.productChoosen.title = x.title;
    });
  }

  deleteProduct(){
    const id = this.productChoosen.id;
    this.productService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(p => p.id === id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore(){
    this.productService.gerProductsByPage(this.limit, this.offset).subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
