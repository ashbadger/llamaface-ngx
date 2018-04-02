import { Component, OnInit } from '@angular/core';
import { PostService } from '../core/posts.service';
import { LlamaService } from '../core/llama.service';
import { Post } from '../core/posts.model';
import { Llama } from '../core/llama.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [ PostService, LlamaService ]
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  post: Post = new Post();
  user = undefined;
  failedLogin = false;
  loaded: Boolean;

  constructor(
    private postService: PostService,
    private llamaService: LlamaService
  ) { }

  ngOnInit() {
    this.loaded = false;
    this.fetchPosts();
    this.fetchCurrentUser();
  }

  fetchPosts() {
    this.postService.getPosts().subscribe(posts => {
      _.forEach(posts, (post) => {
        this.fetchLlama(post.user_id).subscribe(llama => post['user'] = llama)
      })
      this.posts = posts;
      this.loaded = true;
    })
  }

  fetchCurrentUser() {
    this.llamaService.getUser().subscribe(user => {
      this.user = user
    }, () => this.failedLogin = true)
  }

  fetchLlama(id: string) {
    return this.llamaService.getLlama(id)
  }

  savePost(post: Post) {
    post['user_id'] = this.user._id
    this.postService.createPost(post).subscribe(() => this.fetchPosts())
  }

  removePost(id: string) {
    this.postService.deletePost(id).subscribe(() => this.fetchPosts())
  }
}
