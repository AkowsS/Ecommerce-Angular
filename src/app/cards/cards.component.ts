import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  constructor(private router: Router) {}

  @Input() image: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() price: number = 0;

  goToProductDetail(
    title: string,
    description: string,
    price: number,
    image: string
  ) {
    this.router.navigate(['/info'], {
      queryParams: { title, description, price, image: image },
    });
  }
}
