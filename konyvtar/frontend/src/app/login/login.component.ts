// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 style="text-align: center;">Bejelentkezés</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Felhasználónév</mat-label>
        <input matInput formControlName="username">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Jelszó</mat-label>
        <input matInput type="password" formControlName="password">
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Belépés</button>

      <p *ngIf="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </form>
  `,
  styles: [`
    form {
      max-width: 400px;
      margin: 2rem auto;
      display: flex;
      flex-direction: column;
    }
    mat-form-field {
      margin-bottom: 1rem;
    }
  `]
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { username, password } = this.form.value;
    if (username === 'root' && password === 'admin') {
      this.router.navigate(['/books/list']);
    } else {
      this.errorMessage = 'Hibás felhasználónév vagy jelszó';
    }
  }
}
