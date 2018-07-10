import { Component, OnInit, Input } from '@angular/core';
import { LlamaService } from '../core/llama.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Llama } from '../core/llama.model'
import { Post } from '../core/post.model'
import { PostService } from '../core/post.service'

import { forEach, reject } from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
      this.fetchCurrentUser().subscribe((user) => {
        this.user = user;
        this.fetchLlamaProfile(llamaId);
      });
    });
  }

  fetchCurrentUser() {
    return this.llamaService.getUser();
  }

  fetchLlamaProfile(id: string): void {
    this.llamaService.getLlama(id).subscribe((llama) => {
      this.llama = llama

      this.postService.getUserPosts(id).subscribe((posts) => {
        forEach(posts, (post) => {
          post['user'] = this.llama;
          post['canDelete'] = (this.user._id === post.user_id);
        })

        this.posts = posts
      });
    });
  }

  removePost(id: string): void {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = reject(this.posts, {_id: id})
    });
  }
}
