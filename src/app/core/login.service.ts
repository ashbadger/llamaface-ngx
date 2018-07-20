import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Llama } from './llama.model';

@Injectable()
export class LoginService {
    private loginUrl = 'https://llamaface-api.herokuapp.com/llamas/login';
    private llama: Llama = new Llama();

    constructor(
        private http: HttpClient
    ) {}

    login(llama: Llama) {
        return this.http.post(this.loginUrl, llama);
    }

    userLoggedIn() {
        return localStorage.getItem('currentUser') ? true : false;
    }
}
