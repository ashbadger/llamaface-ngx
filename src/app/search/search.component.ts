import { Component, OnInit } from '@angular/core';
import { LlamaService } from '../core/llama.service';
import { Llama } from '../core/llama.model'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ LlamaService ]
})
export class SearchComponent implements OnInit {

  llamas: Llama[] = [];

  constructor(
    private llamaService: LlamaService
  ) { }

  ngOnInit():void {
    this.fetchLlamas()
  }

  fetchLlamas() {
    this.llamaService
      .getLlamas()
      .subscribe(llamas => this.llamas = llamas);
  }

}
