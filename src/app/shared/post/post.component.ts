import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Llama } from '../../core/llama.model';
import { UserPost } from '../../core/post.model';
import { PostService } from '../../core/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() llama: Llama = new Llama();
  @Input() post: UserPost = new UserPost();
  @Input() canDelete: Boolean = false;
  @Output() deletedPost = new EventEmitter();
  @Output() savedPost = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deletePost($event: string) {
    return this.deletedPost.emit($event);
  }
}
