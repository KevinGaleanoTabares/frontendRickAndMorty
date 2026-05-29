import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { driver } from 'driver.js';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})

export class PaginatorComponent implements OnInit {


  message = '';
  messageType= '';
  showLogoutModal = false;

  showMessage(text:string, type: string){

   this.message = text;
   this.messageType = type;

      setTimeout(() => {
    this.message = '';
    this.messageType = '';
  }, 3000);


  }

  constructor(private router: Router) { }

  goCharacters() {
    this.router.navigate(['/characters']);
  }

  goUsers() {
    this.router.navigate(['/users']);
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }

  openLogoutModal() {

  this.showLogoutModal = true;

}

confirmLogout() {

  localStorage.removeItem('token');

  this.router.navigate(['/login']);

}

cancelLogout() {

  this.showLogoutModal = false;

}

  ngOnInit(): void {
  }


}
