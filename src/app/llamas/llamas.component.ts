import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LlamaService } from '../core/llama.service';
import { SearchService } from '../core/search.service'
import { Llama } from '../core/llama.model'

@Component({
  selector: 'app-search',
  templateUrl: './llamas.component.html',
  styleUrls: ['./llamas.component.scss'],
  providers: [ LlamaService, SearchService ]
})
export class LlamasComponent implements OnInit {

  llamas: Llama[] = [];

  constructor(
    private llamaService: LlamaService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.fetchLlamas()
  }

  fetchLlamas() {
    this.llamaService.getLlamas().subscribe(llamas => this.llamas = llamas);
  }
}
