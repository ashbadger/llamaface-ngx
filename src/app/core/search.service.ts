import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Llama } from './llama.model';

@Injectable()
export class SearchService {
    private searchUrl = 'https://llamaface-api.herokuapp.com/llamas/search'
    public searchEvent: EventEmitter<Llama[]> = new EventEmitter();

    public llamas: Llama[] = [];

    constructor(
        private http: HttpClient,
    ) {}

    getSearch(query: string) {
        return this.http.get<Llama[]>(`${this.searchUrl}?q=${query}`)
    }
}
