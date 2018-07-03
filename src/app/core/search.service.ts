import { Injectable, Query, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import * as queryString from 'query-string';

import { Llama } from './llama.model';

@Injectable()
export class SearchService {
    private searchUrl = 'https://llamaface-api.herokuapp.com/llamas/search'
    searchEvent: EventEmitter<Llama[]> = new EventEmitter();

    llamas: Llama[] = [];

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    getSearch(query) {
        return this.http.get<Llama[]>(`${this.searchUrl}?q=${query}`)
    }
}
