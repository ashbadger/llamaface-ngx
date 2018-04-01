import { Component, OnInit } from '@angular/core';
import { LlamaService } from '../core/llama.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Llama } from '../core/llama.model'
import { Post } from '../core/posts.model'
import { PostService } from '../core/posts.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ LlamaService, PostService ]
})
export class ProfileComponent implements OnInit {

  llama: Llama = new Llama();
  posts: Post[] = [];
  user: Llama;

  constructor(
    private route: ActivatedRoute,
    private llamaService: LlamaService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const llamaId = '' + params.get('id');
      this.fetchLlama(llamaId);
      this.fetchLlamaPosts(llamaId);
      this.fetchCurrentUser();
    });

  }

  fetchLlamaPosts(id: string): void {
    this.postService.getUserPosts(id).subscribe(posts => this.posts = posts)
  }

  fetchLlama(id: string): void {
    this.llamaService.getLlama(id).subscribe(llama => this.llama = llama);
  }

  removePost(id: string): void {
    this.postService.deletePost(id).subscribe(() => this.fetchLlamaPosts(this.llama._id))
  }

  fetchCurrentUser(): void {
    this.llamaService.getUser().subscribe(user => this.user = user)
  }
}
