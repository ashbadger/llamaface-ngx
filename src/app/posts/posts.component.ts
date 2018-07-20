import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { LlamaService } from '../core/llama.service';
import { UserPost } from '../core/post.model';
import { Llama } from '../core/llama.model';
import { PostListComponent } from '../shared/post-list/post-list.component';

import { tap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [ LlamaService ]
})
export class PostsComponent implements OnInit {

  @ViewChild(PostListComponent) child: PostListComponent;

  @Output() newPost = new EventEmitter<UserPost>();
  public user: Llama = new Llama();
  public post: UserPost = new UserPost();
  public loaded: Boolean = false;
  public failedLogin: Boolean = false;

  constructor(
    private llamaService: LlamaService
  ) { }

  ngOnInit() {
    this.fetchCurrentUser().subscribe((user) => {
      Object.assign(this.user, user);
      this.post.user_id = this.user._id;
    })
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

  postsLoaded($event: Boolean) {
    return this.loaded = $event;
  }

  savePost(post: UserPost) {
    return this.child.savePost(post);
  }
}
