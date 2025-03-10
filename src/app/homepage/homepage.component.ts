import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiDummyService } from '../services/api-dummy.service';
import { HeaderComponent } from '../header/header.component';
import { CardsComponent } from '../cards/cards.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    CardsComponent,
    RouterOutlet,
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  loading: boolean = false;

  constructor(private apiDummyService: ApiDummyService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    this.apiDummyService.getProducts().subscribe({
      next: (data: any) => {
        if (data && data.products) {
          this.products = data.products;
          this.filteredProducts = data.products;
        } else {
          this.products = [];
          this.filteredProducts = [];
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  loadCategories(): void {
    this.apiDummyService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
  }

  applyFilters(): void {
    let filtered = this.products;

    if (this.selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    const term = this.searchTerm.trim().toLowerCase();
    if (term !== '') {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(term)
      );
    }

    this.filteredProducts = filtered;
  }

  filterByCategory(): void {
    this.applyFilters();
  }

  searchProducts(): void {
    this.applyFilters();
  }
}
