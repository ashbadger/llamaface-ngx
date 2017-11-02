import { SearchService } from '../core/search.service';
import { Llama } from '../core/llama.model'

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  providers: [ SearchService]
})
export class SearchHeaderComponent implements OnInit {

  llamas: Llama[] = [];

  constructor( 
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('currentUser')
  }

  userLoggedIn() {
    return localStorage.getItem('currentUser') ? true : false
  }

  searchLlamas(query) {
    this.searchService.search(query).subscribe(llamas => this.llamas)
  }

}
