import { Component, OnInit } from '@angular/core';
import { getCharacters} from 'src/app/services/api.service';  
import { registerUser } from 'src/app/services/api.service'
import { deleteUser } from 'src/app/services/api.service';
import { getUsers } from 'src/app/services/api.service';
import { updateUser } from 'src/app/services/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: any[] = [];
  showModal: boolean = false;
  editMode: boolean = false; 
  characters: any[] = [];


  formUser = {
    name: '',
    email: '',
    password: '',
    age: 0,
    _id: ''
  };

  
  async loadUsers() {
    try {
      const res = await getUsers();
      this.users = res.data;
    } catch (error) {
      console.error(error)
    }
  }

  

  constructor(private router: Router) { }

  async ngOnInit()  {

    this.loadUsers();

    try {
      const res = await getCharacters();

      this.characters = res.data.results;
    } catch (error) {
      console.error(error);
  }
  }


  newUser = {
  name: '',
  email: '',
  password: '',
  age: 0
  }


  search: string = '' 
  id: string = '';

  filteredCharacters() {
    return this.characters.filter((c: any) => {

      const text = this.search.toLowerCase();

      return (
    c.name.toLowerCase().includes(text) ||
    c.status.toLowerCase().includes(text) ||
    c.species.toLowerCase().includes(text) ||
    c.gender.toLowerCase() === text ||
    c.id.toString().includes(text) 
  );
});

}

  async addUser() {
      await registerUser(this.formUser);
      
      this.loadUsers();
      this.showModal = false;
  }


    async deleteUserById(id: string) {
      try {
        await deleteUser(id);

        alert('Usuario eliminado');

        //Refrescar usuarios automaticamente
        this.loadUsers();
      } catch (error: any) {
        alert(error.response?.data?.message || 'Error');
      }
    }

    async updateUserData() {
      try {
        await updateUser(this.formUser._id, this.formUser);
        console.log("DESPUÉS DEL PUT");

        console.log(localStorage.getItem('token'));

        this.loadUsers();
        this.showModal = false;  // Refrescar usuarios
        
      } catch (error: any) {
        alert(error.response?.data?.message || 'Error');
      }
    }

    openCreateModal() {
      this.editMode = false;

      this.formUser = {
        name: '',
        email: '',
        password: '',
        age: 0,
        _id: ''
      };

      this.showModal = true;
    }

    openEditModal(user:any) {
      this.editMode = true;
      this.formUser = { ...user };
      this.showModal = true;
    }
    logout() {
  localStorage.removeItem('token');
  alert('Sesión cerrada');
  this.router.navigate(['/register'])
  }
}

  



