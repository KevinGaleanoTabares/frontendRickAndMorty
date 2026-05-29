import { Component, OnInit } from '@angular/core';
import { getProfile } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  user: any = null;
  randomImage: string = '';

  constructor(private router: Router) { }

  async ngOnInit() {

    try {
      const res = await getProfile();

      this.user = res.data;

      let randomId = Math.floor(Math.random() * 44) + 2;

       this.randomImage = `https://rickandmortyapi.com/api/character/avatar/${randomId}.jpeg`;

      console.log(this.user);

    } catch (error){
      
      console.error(error);
      
      alert('Sesion inválida');

      this.router.navigate(['/login']);
    }
  }

}
