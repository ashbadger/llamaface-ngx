import { Component, OnInit } from '@angular/core';
import { LlamaService } from '../core/llama.service';
import { Llama } from '../core/llama.model'

@Component({
  selector: 'app-search',
  templateUrl: './llamas.component.html',
  styleUrls: ['./llamas.component.css'],
  providers: [ LlamaService ]
})
export class LlamasComponent implements OnInit {

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
