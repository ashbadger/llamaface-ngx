import { Component, OnInit } from '@angular/core';
import { LlamaService } from '../../core/llama.service'
import { Llama } from '../../core/llama.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup-box',
  templateUrl: './signup-box.component.html',
  styleUrls: ['./signup-box.component.css'],
  providers: [ LlamaService ]
})
export class SignupBoxComponent implements OnInit {

  llama: Llama = new Llama();

  constructor(
    private llamaService: LlamaService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addLlama(): void {
    this.llamaService.createLlama(this.llama).subscribe()
  }

}
