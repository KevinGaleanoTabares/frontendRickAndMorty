import { Component, OnInit } from '@angular/core';
import { registerUser } from 'src/app/services/api.service';  //
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: '',
    age: 0
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async register() {
    try {
      const res = await registerUser(this.user);
      console.log(res.data);
      alert('Usuario creado');
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Error');
    }
  }
  
  goLogin() {
    this.router.navigate(['/login']);
  }

}
