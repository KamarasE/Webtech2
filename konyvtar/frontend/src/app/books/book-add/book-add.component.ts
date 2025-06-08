import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent {
  form: FormGroup;
  successMessage = '';

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: [null, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.bookService.addBook(this.form.value).subscribe(() => {
        this.successMessage = 'Könyv sikeresen hozzáadva!';
        this.form.reset();
      });
    }
  }
}
