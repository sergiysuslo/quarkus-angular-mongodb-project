import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-add-edit',
  templateUrl: './book-add-edit.component.html',
  styleUrls: ['./book-add-edit.component.scss'],
})
export class BookAddEditComponent implements OnInit {
  bookForm: FormGroup;

  genre: string[] = ['Sachbuch', 'Krimi', 'Sci-Fi', 'Roman'];

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private dialogRef: MatDialogRef<BookAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bookForm = this.formBuilder.group({
      title: '',
      author: '',
      genre: '',
    });
  }
  ngOnInit(): void {
    this.bookForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.bookForm.valid) {
      if (this.data) {
        this.booksService
          .editBook(this.data.id, this.bookForm.value)
          .subscribe({
            next: (val: any) => {
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
        // console.log(this.bookForm.value);
        this.booksService.addBook(this.bookForm.value).subscribe({
          next: (val: any) => {
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
