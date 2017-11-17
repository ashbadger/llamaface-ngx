import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'query-string';
import 'rxjs/add/operator/map'

import { Llama } from './llama.model';

@Injectable()
export class LoginService {
    private loginUrl = 'https://llamaface-api.herokuapp.com/llamas/login'

    llama : Llama = new Llama();

    constructor(private http: HttpClient) {}  
    login(llama: Llama) {
        return this.http.post(this.loginUrl, llama)
    }

    userLoggedIn() {
        return localStorage.getItem('currentUser') ? true : false
    }    
}