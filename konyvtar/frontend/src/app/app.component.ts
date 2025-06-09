import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ],
  template: `
    <h1 style="font-family: cursive;">Könyvtár</h1>
    <nav *ngIf="!isLogin">
      <a routerLink="/books/list">Könyvlista</a> |
      <a routerLink="/books/add">Könyv hozzáadása</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav a {
      margin-right: 1rem;
    }
  `]
})
export class AppComponent {
  isLogin = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLogin = event.url === '/';
    });
  }
}
