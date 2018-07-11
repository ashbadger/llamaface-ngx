import { Component, OnInit } from '@angular/core';
import { PostService } from '../core/post.service';
import { LlamaService } from '../core/llama.service';
import { Post } from '../core/post.model';
import { Llama } from '../core/llama.model';

import { forEach } from 'lodash';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [ PostService, LlamaService ]
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  post: Post = new Post();
  user: Llama = new Llama();
  failedLogin: Boolean = undefined;
  loaded: Boolean = false;

  constructor(
    private postService: PostService,
    private llamaService: LlamaService
  ) { }

  ngOnInit() {
    this.fetchPosts().pipe(
      map((posts) => this.posts = posts),
      map(() => this.fetchCurrentUser()),
      map(() => this.attachUserstoPosts()),
      map(() => this.loaded = true)
    ).subscribe()
  }

  fetchPosts() {
    return this.postService.getPosts();
  }

  attachUserstoPosts() {
    forEach(this.posts, (post) => {
      this.fetchLlama(post.user_id).subscribe((llama) => {
        post['user'] = llama;
        post['canDelete'] = (post.user_id === this.user._id);
      });
    })
  }

  fetchCurrentUser() {
    return this.llamaService.getUser().subscribe((user) => {
      this.user = user;
    }, () => this.failedLogin = true);
  }

  fetchLlama(id: string) {
    return this.llamaService.getLlama(id);
  }

  savePost(post: Post) {
    post['user_id'] = this.user._id;
    this.postService.createPost(post).subscribe(() => this.fetchPosts());
  }

  removePost(id: string) {
    this.postService.deletePost(id).subscribe(() => this.fetchPosts());
  }
}
