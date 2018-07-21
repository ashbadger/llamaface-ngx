import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, animate, style } from '../../../../node_modules/@angular/animations';

import { Llama } from '../../core/llama.model';
import { UserPost } from '../../core/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    trigger('postsLoaded', [
      state('void', style({opacity: 0})),
      transition('* <=> *', animate('400ms ease-in')
    )
  ])]
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
