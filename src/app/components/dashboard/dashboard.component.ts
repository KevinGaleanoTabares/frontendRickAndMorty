// import { Component, OnInit } from '@angular/core';
// import { getCharacters } from 'src/app/services/api.service';
// import { registerUser } from 'src/app/services/api.service'
// import { deleteUser } from 'src/app/services/api.service';
// import { getUsers } from 'src/app/services/api.service';
// import { updateUser } from 'src/app/services/api.service';
// import { Router } from '@angular/router';
// import { DateTime } from 'luxon';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html'
// })
// export class DashboardComponent implements OnInit {

//   users: any[] = [];
//   showModal: boolean = false;
//   showProfileModal: boolean = false;
//   selectedUser: any = null;
//   randomImage: string = '';
//   editMode: boolean = false;
//   characters: any[] = [];


//   formUser = {
//     name: '',
//     email: '',
//     password: '',
//     age: 0,
//     _id: ''
//   };

//     formatDate(date:string){
//     return DateTime.fromISO(date).toFormat('dd/MM/yyyy');
//   }

//   async loadUsers() {
//     try {
//       const res = await getUsers();

//       console.log('DATA:', res.data);

      
//       this.users = res.data;

//           console.log('USERS:', this.users);

//     } catch (error) {
//       console.error(error)
//     }
//   }

//   constructor(private router: Router) { }

//   async ngOnInit() {

//     this.loadUsers();

//     try {
//       const res = await getCharacters();

//       this.characters = res.data.results;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   newUser = {
//     name: '',
//     email: '',
//     password: '',
//     age: 0
//   }
// // ------------------------------------------------------------------------------------------------------
//   search: string = ''
//   receiveSearch(text:string){
//     this.userSearch = text;
//   }
//   userSearch = ''; /* El término de búsqueda que se usará para filtrar los usuarios */
//   id: string = '';

//   async addUser() {
//     await registerUser(this.formUser);

//     this.loadUsers();
//     this.showModal = false;
//   }
// // --------------------------------------------------------------------------------------------------------
//  characterSearch: string = '';

//  receiveCharacterSearch(text:string) {
//   this.characterSearch = text;
//  }


//   async deleteUserById(id: string) {
//     try {
//       await deleteUser(id);

//       alert('Usuario eliminado');

//       //Refrescar usuarios automaticamente
//       this.loadUsers();
//     } catch (error: any) {
//       alert(error.response?.data?.message || 'Error');
//     }
//   }

//   async updateUserData() {
//     try {
//       await updateUser(this.formUser._id, this.formUser);

//       this.loadUsers();
//       this.showModal = false;  // Refrescar usuarios

//     } catch (error: any) {
//       alert(error.response?.data?.message || 'Error');
//     }
//   }

//   openCreateModal() {
//     this.editMode = false;

//     this.formUser = {
//       name: '',
//       email: '',
//       password: '',
//       age: 0,
//       _id: ''
//     };

//     this.showModal = true;
//   }

//   openEditModal(user: any) {
//     this.editMode = true;
//     this.formUser = { ...user };
//     this.showModal = true;
//   }
        
//   openProfileModal(user:any) {
//       let randomId = Math.floor(Math.random() * 44) + 2;
//       let avatar = `https://rickandmortyapi.com/api/character/avatar.jpeg`;

//     this.selectedUser=user;
//     this.randomImage = avatar;
//     this.showProfileModal = true;
//   }

//   logout() {
//     localStorage.removeItem('token');
//     alert('Sesión cerrada');
//     this.router.navigate(['/login'])
//   }

//     page1(){
//     this.router.navigate(['/login']);
//   }
// }