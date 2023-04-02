import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookAddEditComponent } from './book-add-edit/book-add-edit.component';
import { BooksService } from './services/books.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['title', 'author', 'genre', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private booksService: BooksService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  openBookDialog() {
    const dialogRef = this.dialog.open(BookAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllBooks();
        }
      },
    });
  }

  getAllBooks() {
    this.booksService.getAllBooks().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBook(id: string) {
    this.booksService.deleteBook(id).subscribe({
      next: (res) => {
        this.getAllBooks();
      },
      error: console.log,
    });
  }

  openEditBookDialog(_data: any) {
    const dialogRef = this.dialog.open(BookAddEditComponent, {
      data: _data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllBooks();
        }
      },
    });
  }
}
