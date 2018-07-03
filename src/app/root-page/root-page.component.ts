import { Component, OnInit } from '@angular/core';

import { LoginService } from '../core/login.service'

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  styleUrls: ['./root-page.component.css'],
  providers: [ LoginService ]
})
export class RootPageComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
