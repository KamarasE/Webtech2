import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Könyvtár</h1>
    <nav>
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
export class AppComponent {}
