import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'query-string';

import { Llama } from './llama.model';

@Injectable()
export class LlamaService {
    private llamasUrl = 'https://stormy-wave-45173.herokuapp.com/llamas'

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
}