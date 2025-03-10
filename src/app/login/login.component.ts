import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  userData: any = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  getUserData(token: string) {
    this.authService.getUserProfile(token).subscribe({
      next: (user) => {
        this.userData = user;
      },
      error: () => {
        this.errorMessage = 'Error fetching user information.';
      },
    });
  }

  onReturn() {
    this.router.navigate(['/']);
  }

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    setTimeout(() => {
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.userData = response;
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Login error. Please check your credentials.';
          this.isLoading = false;
        },
      });
    }, 3000);
  }

  images: HTMLImageElement[] = [];
  currentIndex = 0;

  ngOnInit(): void {
    this.images = Array.from(document.querySelectorAll('.baner-login'));
    this.startCarousel();
  }

  startCarousel(): void {
    setInterval(() => {
      this.images[this.currentIndex].classList.remove('active');
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.images[this.currentIndex].classList.add('active');
    }, 4000);
  }

  prevImage(): void {
    this.images[this.currentIndex].classList.remove('active');
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.images[this.currentIndex].classList.add('active');
  }

  nextImage(): void {
    this.images[this.currentIndex].classList.remove('active');
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.images[this.currentIndex].classList.add('active');
  }
}
