import { query } from '@angular/core/src/animation/dsl';
import { Injectable, Query, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as queryString from 'query-string';
import 'rxjs/add/operator/map';

import { Llama } from './llama.model';

@Injectable()
export class SearchService {
    private searchUrl = 'https://llamaface-api.herokuapp.com/search'
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