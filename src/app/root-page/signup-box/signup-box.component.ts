import { Component, OnInit } from '@angular/core';
import { LlamaService } from '../../core/llama.service'
import { LoginService } from '../../core/login.service'
import { Llama } from '../../core/llama.model'
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

let _ = require('lodash')

@Component({
  selector: 'app-signup-box',
  templateUrl: './signup-box.component.html',
  styleUrls: ['./signup-box.component.css'],
  providers: [ LlamaService ]
})
export class SignupBoxComponent implements OnInit {

  llama: Llama = new Llama();
  alreadyExists;
  requiredFields;
  llamaForm;

  constructor(
    private llamaService: LlamaService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.requiredFields = true;

    this.llamaForm = this.fb.group({
      'name': ['', [Validators.required,Validators.minLength(4)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': this.fb.group({
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]]
      }, {validator: this.passwordMatchValidator})
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirm_password').value
       ? null : {'mismatch': true};
  }

  addLlama(): void {

    this.llama = _.update(this.llamaForm.value, 'password', (form) => form.password)

    this.llamaService.createLlama(this.llama).subscribe(() => {
      this.loginOnRegister();
    }, (error) => {
      if(error.error.code == 11000) {
        this.alreadyExists = true;
        this.requiredFields = true;
      } else {
        this.requiredFields = false;
      }
    })
  }

  loginOnRegister() {
    let llama = this.llama
    
    return this.loginService.login(llama)
      .subscribe((res) => {
        localStorage.setItem('currentUser', res['token'])
        this.router.navigate(['/account']);
      })
  }

}
