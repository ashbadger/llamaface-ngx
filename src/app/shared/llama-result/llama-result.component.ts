import { Component, OnInit, Input } from '@angular/core';

import { Llama } from '../../core/llama.model';

@Component({
  selector: 'app-llama-result',
  templateUrl: './llama-result.component.html',
  styleUrls: ['./llama-result.component.css']
})
export class LlamaResultComponent implements OnInit {
  @Input() llama: Llama;

  constructor() { }

  ngOnInit() {
  }

}
