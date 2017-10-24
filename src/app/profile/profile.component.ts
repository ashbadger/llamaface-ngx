import { Component, OnInit } from '@angular/core';
import { LlamaService } from '../core/llama.service';
import { Llama } from '../core/llama.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ LlamaService ]
})
export class ProfileComponent implements OnInit {

  llamas: Llama[] = [];

  constructor(
    private llamaService: LlamaService
  ) { }

  ngOnInit() {
    this.fetchLlamas()
  }

  fetchLlamas() {
    this.llamaService
      .getLlamas()
      .subscribe(response => {
        this.llamas = response.llamas
      }, err => console.log("Something went wrong."));
  }
}
