import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.http.get('http://localhost:8080/api/books');
  }

  addBook(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/books', data);
  }

  editBook(id: string, data: any): Observable<any> {
    return this.http.put('http://localhost:8080/api/books/' + id, data);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete('http://localhost:8080/api/books/' + id);
  }
}
