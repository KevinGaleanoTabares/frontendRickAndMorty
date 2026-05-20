import { Component, OnInit } from '@angular/core';
import { loginUser } from 'src/app/services/api.service';  //
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  async login() {
    try {
      const res = await loginUser(this.user);
      console.log(res.data);
      
      //Guardar el token
      localStorage.setItem('token', res.data.token);

      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error');
    }

  }
  
  goRegister() {
      this.router.navigate(['/register']);
    }



  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
