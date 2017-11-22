import { Services } from '@angular/core/src/view';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../core/login.service'
import { Llama } from '../../core/llama.model'

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css'],
  providers: [ LoginService ]
})
export class LoginBoxComponent implements OnInit {

  llama: Llama = new Llama();
  failedAttempt;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {}

  onLogin() {
    let llama = this.llama
    
    return this.loginService.login(llama)
    .subscribe((res) => {
      localStorage.setItem('currentUser', res['token'])
      this.router.navigate(['/posts']);
    }, (error) => {
      this.failedAttempt = true;
    })
  }
}
