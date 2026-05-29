import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginUser } from 'src/app/services/api.service';  //
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  showPassword = false;
  

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({

      email: [
        '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required
      ]
    ]

    });

  }

  async login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    try {

      const res = await loginUser(this.loginForm.value);

      localStorage.setItem('token', res.data.token); //

      this.router.navigate(['/characters']);

    } catch (error:any) {

      alert(error.response?.data?.message || 'Error');

    }

  }

  togglePassword() {

    this.showPassword = !this.showPassword;

  }

  goRegister() {

    this.router.navigate(['/register'])

  }


}
