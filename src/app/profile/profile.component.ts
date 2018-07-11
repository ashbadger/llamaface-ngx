import { Component, OnInit, Input } from '@angular/core';
import { LlamaService } from '../core/llama.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Llama } from '../core/llama.model'
import { Post } from '../core/post.model'
import { PostService } from '../core/post.service'

import { forEach, reject } from 'lodash';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ LlamaService, PostService ]
})
export class ProfileComponent implements OnInit {

  llama: Llama = new Llama();
  user: Llama = new Llama();
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private llamaService: LlamaService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const llamaId = '' + params.get('id');
      this.fetchUserPosts(llamaId).pipe(
        map((posts) => this.posts = posts),
        map(() => this.fetchUserPosts(llamaId)),
        map(() => this.fetchLlama(llamaId)),
        map(() => this.fetchCurrentUser()),
        map(() => this.attachUserstoPosts())
      ).subscribe()
    });
  }

  fetchUserPosts(id) {
    return this.postService.getUserPosts(id);
  }

  attachUserstoPosts() {
    forEach(this.posts, (post) => {
        post['user'] = this.llama;
        post['canDelete'] = (post.user_id === this.user._id);
    })
  }

  fetchLlama(id: string) {
    return this.llamaService.getLlama(id).subscribe(llama => Object.assign(this.llama, llama));
  }

  fetchCurrentUser() {
    return this.llamaService.getUser().subscribe(user => this.user = user);
  }

  removePost(id: string): void {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = reject(this.posts, {_id: id})
    });
  }
}
