import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [LoginService]
})
export class HomeComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.loginService.userLoggedIn() == true){
      this.router.navigate(['/posts']);
    } else {
      this.router.navigate(['/login'])
    }
  }

}
