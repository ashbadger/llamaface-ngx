import { Component, OnInit } from '@angular/core';
import { PostService } from '../core/post.service';
import { LlamaService } from '../core/llama.service';
import { Post } from '../core/post.model';
import { Llama } from '../core/llama.model';

import { forEach } from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
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
    this.fetchCurrentUser().subscribe((user) => {
      this.user = user
      this.fetchPosts();
    }, () => this.failedLogin = true);
  }

  fetchPosts() {
    this.postService.getPosts().subscribe(posts => {
      forEach(posts, (post) => {
        this.fetchLlama(post.user_id).subscribe((llama) => {
          post['user'] = llama;
          post['canDelete'] = post.user_id === this.user._id ? true : false;
        });
      })
      this.posts = posts;
      this.loaded = true;
    })
  }

  fetchCurrentUser() {
    return this.llamaService.getUser();
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
