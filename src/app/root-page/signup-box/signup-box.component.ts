import { Component, OnInit } from '@angular/core';
import { LlamaService } from '../../core/llama.service'
import { LoginService } from '../../core/login.service'
import { Llama } from '../../core/llama.model'
import { Router } from '@angular/router'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

import { update } from 'lodash';

class Token {
  token: string;
}

@Component({
  selector: 'app-signup-box',
  templateUrl: './signup-box.component.html',
  styleUrls: ['./signup-box.component.scss'],
  providers: [ LlamaService ]
})
export class SignupBoxComponent implements OnInit {

  public llama: Llama = new Llama();
  public alreadyExists: Boolean = false;
  public requiredFields: Boolean = true;
  public llamaForm: FormGroup;

  constructor(
    private llamaService: LlamaService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.llamaForm = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(4)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': this.fb.group({
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]]
      }, { validator: this.passwordMatchValidator })
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirm_password').value
       ? null : { 'mismatch': true };
  }

  addLlama(): void {

    this.llama = update(this.llamaForm.value, 'password', (form) => form.password)

    this.llamaService.createLlama(this.llama).subscribe(() => {
      this.loginOnRegister();
    }, (error) => {
      if (error.error.code === 11000) {
        this.alreadyExists = true;
        this.requiredFields = true;
      } else {
        this.requiredFields = false;
      }
    })
  }

  loginOnRegister() {
    const llama = this.llama

    return this.loginService.login(llama)
      .subscribe((res) => {
        localStorage.setItem('currentUser', (res as Token)['token'])
        this.router.navigate(['/account']);
      })
  }

}
