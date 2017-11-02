import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'query-string';

import { Llama } from './llama.model';

@Injectable()
export class LlamaService {
    // private llamasUrl = 'https://stormy-wave-45173.herokuapp.com/llamas'
    private llamasUrl = 'http://localhost:3000/llamas'
    private auth_header = {headers: new HttpHeaders().set('x-auth', localStorage.getItem('currentUser'))}

    constructor(private http: HttpClient) {}    
    getLlamas(params = {}): Observable<Llama[]> {
        let paramsString = queryString.stringify(params);
        let httpParams = new HttpParams({ fromString: paramsString });
        return this.http.get<Llama[]>(this.llamasUrl, {params: httpParams });
    }

    getLlama(id: string): Observable<Llama> {
        const url = `${this.llamasUrl}/${id}`;
        return this.http.get<Llama>(url);
    }

    createLlama(llama : Llama) {
        let url = this.llamasUrl;
        return this.http.post<Llama>(url, llama).subscribe();
    }

    getUser(): Observable<Llama> {
        let url = `http://localhost:3000/me`;
        return this.http.get<Llama>(url, this.auth_header);
    }

    updateUser(llama : Llama) {
        let url = `${this.llamasUrl}/${llama._id}`;
        return this.http.patch<Llama>(url, llama, this.auth_header);
    }
}