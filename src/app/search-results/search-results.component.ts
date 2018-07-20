import { SearchService } from '../core/search.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Llama } from '../core/llama.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  providers: [ SearchService]
})
export class SearchResultsComponent implements OnInit {

  public llamas: Llama[] = [];
  public query = '';

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((query) => {
      this.query = query.q;

      const httpParams = new HttpParams();
      httpParams.set('q', this.query);

      this.getSearch().subscribe(llamas => this.llamas = llamas);
    })
  }

  getSearch() {
    return this.searchService.getSearch(this.query);
  }
}
