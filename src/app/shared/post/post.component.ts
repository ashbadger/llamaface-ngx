import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Llama } from '../../core/llama.model';
import { Post } from '../../core/post.model';
import { PostService } from '../../core/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [ PostService ],
})
export class PostComponent implements OnInit {

  @Input() llama: Llama;
  @Input() post: Post;
  @Input() canDelete: Boolean;
  @Output() deletedPost = new EventEmitter();

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit() {
  }

  deletePost($event) {
    return this.deletedPost.emit($event);
  }
}
