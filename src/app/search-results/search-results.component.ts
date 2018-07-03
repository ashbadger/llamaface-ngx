import { SearchService } from '../core/search.service';
import { Component, OnChanges, OnInit, Query } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Llama } from '../core/llama.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  providers: [ SearchService]
})
export class SearchResultsComponent implements OnInit {

  llamas: Llama[];
  query = '';

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((query) => {
      this.query = query.q;

      const httpParams = new HttpParams();
      httpParams.set('q', this.query);

      this.getSearch();
    })
  }

  getSearch() {
    this.searchService.getSearch(this.query)
    .subscribe(llamas => this.llamas = llamas)
  }
}
