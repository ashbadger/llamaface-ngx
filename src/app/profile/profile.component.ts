import { Component, OnInit, Input } from '@angular/core';
import { LlamaService } from '../core/llama.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Llama } from '../core/llama.model';
import { PostService } from '../core/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ LlamaService, PostService ]
})
export class ProfileComponent implements OnInit {

  public llama: Llama = new Llama();
  public llamaId = '';

  constructor(
    private route: ActivatedRoute,
    private llamaService: LlamaService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.llamaId = '' + params.get('id');
      this.fetchLlama(this.llamaId).subscribe(llama => Object.assign(this.llama, llama));
    });
  }

  fetchLlama(id: string) {
    return this.llamaService.getLlama(id);
  }
}
