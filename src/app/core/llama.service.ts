import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'query-string';

import { Llama } from './llama.model';

interface LlamasResponse {
    llamas: Llama[];
  }

@Injectable()
export class LlamaService {

    constructor(private http: HttpClient) {}    
    private llamasUrl = 'https://stormy-wave-45173.herokuapp.com/llamas/'
    getLlamas(params = {}): Observable<LlamasResponse> {
        let paramsString = queryString.stringify(params);
        let httpParams = new HttpParams({ fromString: paramsString });
        return this.http.get<LlamasResponse>(this.llamasUrl, {params: httpParams });
    }

}