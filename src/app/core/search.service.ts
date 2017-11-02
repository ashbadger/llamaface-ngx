import { query } from '@angular/core/src/animation/dsl';
import { Injectable, Query } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'query-string';
import 'rxjs/add/operator/map';

import { Llama } from './llama.model';

@Injectable()
export class SearchService {
    // private loginUrl = 'https://stormy-wave-45173.herokuapp.com/llamas/login'
    private searchUrl = 'http://localhost:3000/search'

    llama : Llama = new Llama();

    constructor(private http: HttpClient) {}  

    search(query: Query) {
        return this.http.get(`${this.searchUrl}?q=${query}`)
    }
}