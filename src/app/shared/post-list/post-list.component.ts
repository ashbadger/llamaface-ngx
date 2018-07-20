import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { from, concat, EMPTY } from 'rxjs';
import { map, switchMap, tap, concatMap, catchError } from 'rxjs/operators';
import { reject } from 'lodash';

import { PostService } from '../../core/post.service';
import { LlamaService } from '../../core/llama.service';
import { Post, UserPost } from '../../core/post.model';
import { Llama } from '../../core/llama.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [ PostService, LlamaService]
})
export class PostListComponent implements OnInit {

  public posts: UserPost[] = [];
  public user: Llama = new Llama();
  public failedLogin: Boolean = false;
  public postsLoadFinished: Boolean = false;
  public _newPost: UserPost = new UserPost();

  @Output() loaded = new EventEmitter<Boolean>();
  @Input() userId = '';
  @Input()
  set newPost(post: UserPost){
    Object.assign(this._newPost, post);
  }
  get newPost(){
    return this._newPost;
  }

  constructor(
    private postService: PostService,
    private llamaService: LlamaService
  ) { }

  ngOnInit() {
    concat(
      this.fetchCurrentUser(),
      this.fetchPosts()
    )
    .subscribe((post) => {
      this.posts.push(post as UserPost);
      this.emitLoaded();
    })
  }

  fetchPosts() {
    const fetch = this.userId ? this.postService.getUserPosts(this.userId) : this.postService.getPosts();

    return fetch.pipe(
      switchMap(posts => from(posts as Post[])),
      concatMap(post => this.attachUsertoPost(post as UserPost)),
    )
  }

  attachUsertoPost(post: UserPost) {
    return this.llamaService.getLlama(post.user_id).pipe(
      map((user) => {
        const canDelete = this.user._id === user._id;
        return Object.assign(post, { user, canDelete })
      }));
  }

  fetchCurrentUser() {
    return this.llamaService.getUser().pipe(
      tap((user) => {
        Object.assign(this.user, user);
      }),
      catchError(() => {
        this.failedLogin = true;
        return EMPTY;
      })
    );
  }

  fetchUser(id: string) {
    return this.llamaService.getLlama(id);
  }

  savePost(post: Post) {
    post['user_id'] = this.user._id;
    this.postService.createPost(post).subscribe((newPost) => {
      this.attachUsertoPost(newPost as UserPost).subscribe((userPost: UserPost) => {
        this.posts.unshift(userPost);
        return userPost;
      });
    })
  }

  removePost(id: string) {
    this.postService.deletePost(id).subscribe((post: Post) => {
      this.posts = reject(this.posts, { _id: post._id });
    });
  }

  emitLoaded() {
    this.postsLoadFinished = true;
    return this.loaded.emit(true);
  }
}
