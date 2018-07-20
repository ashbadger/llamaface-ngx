import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../core/login.service'
import { Llama } from '../../core/llama.model'

class Token {
  token: string;
}

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss'],
  providers: [ LoginService ]
})
export class LoginBoxComponent implements OnInit {

  public llama: Llama = new Llama();
  public failedAttempt: Boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {}

  onLogin() {
    const llama = this.llama;

    return this.loginService.login(llama)
      .subscribe((res) => {
        localStorage.setItem('currentUser', (res as Token)['token']);
        this.router.navigate(['/posts']);
      }, () => {
        this.failedAttempt = true;
      })
  }
}
