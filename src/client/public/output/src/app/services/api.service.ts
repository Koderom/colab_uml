import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private apiUrl = 'https://example.com/api'; // Cambiar a tu URL de API

    constructor(private http: HttpClient) { }

    sendContactForm(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/contact`, data);
    }
}