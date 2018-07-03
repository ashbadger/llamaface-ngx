import { Component, OnInit } from '@angular/core';
import { LlamaService } from '../core/llama.service';
import { Llama } from '../core/llama.model';
import { Router } from '@angular/router'
import { PostService } from '../core/posts.service'

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  providers: [ LlamaService, PostService ]
})
export class AccountDetailsComponent implements OnInit {

  llama: Llama = new Llama();
  saved = false;

  constructor(
    private llamaService: LlamaService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {

    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/login']);
    }

    this.fetchUser();
  }

  fetchUser() {
    this.llamaService.getUser().subscribe((user) => {
      this.llama = user;
    })
  }

  saveUser(llama: Llama) {
    this.llamaService.updateUser(llama).subscribe(() => {
      this.saved = true;
    });
  }

  deleteUser(id: string) {
    this.postService.deleteUserPosts(id).subscribe()

    this.llamaService.removeUser(id).subscribe(() => {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    })
  }
}
