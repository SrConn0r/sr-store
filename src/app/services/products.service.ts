import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { map } from 'rxjs/operators';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl: string = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http : HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params, context: checkTime() })
    .pipe(
      map(products => products.map(item =>{
        return {
          ...item,
          taxes: item.price * 0.19
        }
      }))
    );
  }

  getProduct(id: string){
    return this.http.get<Product>(this.apiUrl+ '/' + id);
  }

  gerProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(this.apiUrl, {
      params: {limit: limit, offset: offset}
    });
  }

  create(product: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl,product);
  }

  update(dto: UpdateProductDTO, id: string){
    return this.http.put<Product>(this.apiUrl+ '/' + id,dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(this.apiUrl+ '/' + id);
  }

}
