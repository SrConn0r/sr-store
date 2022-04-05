import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { map } from 'rxjs/operators';
import { checkTime } from '../interceptors/time.interceptor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl: string = `${environment.API_URL}/api`;

  constructor(
    private http : HttpClient
  ) { }

  getByCategory(categoryId: string, limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, {params, context: checkTime()})
  }

  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
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
    return this.http.get<Product>(this.apiUrl+ '/products/' + id);
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: {limit: limit, offset: offset}
    });
  }

  create(product: CreateProductDTO){
    return this.http.post<Product>(`${this.apiUrl}/products/`,product);
  }

  update(dto: UpdateProductDTO, id: string){
    return this.http.put<Product>(this.apiUrl+ '/products/' + id,dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(this.apiUrl+ '/products/' + id);
  }

}
