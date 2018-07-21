import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, animate, style } from '../../../../node_modules/@angular/animations';

import { Llama } from '../../core/llama.model';

@Component({
  selector: 'app-llama-result',
  templateUrl: './llama-result.component.html',
  styleUrls: ['./llama-result.component.scss'],
  animations: [
    trigger('llamaLoaded', [
      state('void', style({opacity: 0})),
      transition('* <=> *', animate('400ms ease-in')
    )
  ])]
})
export class LlamaResultComponent implements OnInit {
  @Input() llama: Llama;

  constructor() { }

  ngOnInit() {
  }

}
