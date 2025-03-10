import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ApiDummyService } from '../services/api-dummy.service';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-pageinfo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, CardsComponent],
  templateUrl: './pageinfo.component.html',
  styleUrl: './pageinfo.component.css',
})
export class PageInfoComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  title: string = '';
  description: string = '';
  price: number = 0;
  image: string = '';

  products: any[] = [];
  baseProducts: any[] = [];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiDummyService: ApiDummyService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.title = params['title'];
      this.description = params['description'];
      this.price = params['price'];
      this.image = params['image'];
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.apiDummyService.getProducts().subscribe({
      next: (data: any) => {
        if (data && data.products) {
          this.products = data.products;
          this.baseProducts = data.products;
        } else {
          this.products = [];
          this.baseProducts = [];
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

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: -600,
      behavior: 'smooth',
    });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: 600,
      behavior: 'smooth',
    });
  }
}
