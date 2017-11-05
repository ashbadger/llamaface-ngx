import { SearchService } from '../core/search.service';
import { Component, OnChanges, OnInit, Query } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Llama } from '../core/llama.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  providers: [ SearchService]
})
export class SearchResultsComponent implements OnInit {

  llamas: Llama[] = [];
  query: string = '';

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((query) => {
      this.query = query.q
      this.getSearch(this.query);
    }) 
  }

  getSearch(query) {
    const search = new URLSearchParams();
    search.set('q', query.q as string);

    this.searchService.search(query)
    .subscribe(llamas => this.llamas = llamas)
  }
}
