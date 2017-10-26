import { Component, OnInit } from '@angular/core';
import { LlamaService } from '../core/llama.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Llama } from '../core/llama.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ LlamaService ]
})
export class ProfileComponent implements OnInit {

  llama: Llama = new Llama();

  constructor(
    private route: ActivatedRoute,
    private llamaService: LlamaService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const llamaId = ''+params.get('id');
      this.fetchLlama(llamaId);
    });
  }

  fetchLlama(id: string): void {
    this.llamaService.getLlama(id).subscribe(llama => this.llama = llama);
  }
}
