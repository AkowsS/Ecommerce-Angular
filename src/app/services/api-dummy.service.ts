import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiDummyService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getProducts(limit: number = 100, skip: number = 0): Observable<any> {
    const url = `${this.baseUrl}/products?limit=${limit}&skip=${skip}`;
    return this.http.get(url);
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/search?q=${query}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<any>(`${this.baseUrl}/products`).pipe(
      map((response) => {
        const categories = new Set<string>();
        response.products.forEach((product: any) => {
          categories.add(product.category);
        });
        return Array.from(categories);
      })
    );
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/category/${category}`);
  }
}
