import { Component, OnInit } from '@angular/core';
import { LlamaService } from '../core/llama.service';
import { Llama } from '../core/llama.model';

@Component({
  selector: 'app-signup-details',
  templateUrl: './signup-details.component.html',
  styleUrls: ['./signup-details.component.css'],
  providers: [ LlamaService ]
})
export class SignupDetailsComponent implements OnInit {

  llama: Llama = new Llama();
  saved = false;

  constructor(
    private llamaService : LlamaService
  ) { }

  ngOnInit(){
    this.fetchUser();
  }

  fetchUser() {
    this.llamaService.getUser().subscribe(user => {
      this.llama = user
    })
  }

  saveUser(llama: Llama) {
    this.llamaService.updateUser(llama).subscribe(() => {
      this.saved = true;
    });
  }
}
