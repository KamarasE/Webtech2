import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }
  deleteBook(book: Book): void {
  if (confirm(`Biztosan törlöd: ${book.title}?`)) {
    this.bookService.deleteBookByTitle(book.title, book.author).subscribe(() => {
      this.books = this.books.filter(b => b.title !== book.title || b.author !== book.author);
    });
  }
}
}
