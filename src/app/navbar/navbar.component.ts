import { SearchService } from '../core/search.service';
import { LlamaService } from '../core/llama.service';
import { Llama } from '../core/llama.model';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';

import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [ SearchService, LlamaService ]
})
export class NavbarComponent implements OnInit {

  llamas: Llama[] = [];
  user: Llama;
  public query: string;

  searchCtrl: FormControl;

  constructor(
    private searchService: SearchService,
    private llamaService: LlamaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((query) => this.query = query.q);
    this.fetchUser();
  }

  logout() {
    this.llamaService.removeAuthToken().subscribe(() => {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }, (err) => this.router.navigate(['/login']));
  }

  searchLlamas() {
    this.router.navigate(['/search'], { queryParams: { q: this.query } });
  }

  fetchUser() {
    this.llamaService.getUser().subscribe(user => this.user = user)
  }
}
