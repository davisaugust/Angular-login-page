import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { ToastrService } from 'ngx-toastr';

interface LoginForm{
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayout,
    ReactiveFormsModule,
    PrimaryInput
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  loginForm!: FormGroup<LoginForm>;
  toastService: any;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.toastr.success("Parabéns!");
        this.router.navigate(["/user"]);
      },
      error: () => this.toastr.error("Usuário ou senha não encontrado!")
    });
  }

  navigate(){
    this.router.navigate(["/signup"]);
  }
}
