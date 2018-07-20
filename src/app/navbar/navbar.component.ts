import { LlamaService } from '../core/llama.service';
import { Llama } from '../core/llama.model';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [ LlamaService ]
})
export class NavbarComponent implements OnInit {

  public user: Llama = new Llama();
  public query = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private llamaService: LlamaService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((query) => this.query = query.q);
    this.fetchUser().subscribe(user => Object.assign(this.user, user));
  }

  logout() {
    this.llamaService.removeAuthToken().subscribe(() => {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }, () => this.router.navigate(['/login']));
  }

  searchLlamas() {
    this.router.navigate(['/search'], { queryParams: { q: this.query } });
  }

  fetchUser() {
    return this.llamaService.getUser();
  }
}
