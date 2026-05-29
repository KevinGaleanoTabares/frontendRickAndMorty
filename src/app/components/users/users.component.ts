import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getUsers, registerUser, deleteUser, updateUser } from 'src/app/services/api.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {

  users: any[] = [];

  userSearch = '';

  showModal: boolean = false;

  editMode: boolean = false;

  showProfileModal: boolean = false;

  selectedUser: any = null;

  randomImage: string = '';

  userForm!: FormGroup;

  message = '';
  messageType = '';

  startDate = '';
  endDate = '';

  constructor(private fb: FormBuilder) { }

  async ngOnInit() { //Por que no puede ser async y :void
    this.loadUsers();

    this.userForm = this.fb.group({

      name: [

        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

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
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/
          )
        ]
      ],
      age: [
        0,
        [
          Validators.required,
          Validators.min(18),
          Validators.max(100)
        ]
      ],

      _id: ['']

    });

  }

  async loadUsers() {
    try {
      const res = await getUsers();

      this.users = res.data;
    } catch (error) {
      this.showMessage(
        'Ha ocurrido un error',
        'error'
      );
    }
  }

  receiveSearch(text: string) {

    this.userSearch = text;
  }

  openCreateModal() {

    this.editMode = false;

    this.userForm.reset({
      name: '',
      email: '',
      password: '',
      age: 0,
      _id: ''
    });

    this.showModal = true;
  }

  openEditModal(user: any) {

    this.editMode = true;

    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: '',
      age: user.age,
      _id: user._id
    });

    this.showModal = true;
  }

  async addUser() {

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      return;
    }

    try {

      await registerUser(this.userForm.value);

      this.loadUsers();

      this.showModal = false;

      this.showMessage(
        'Usuario creado correctamente', 'success'
      )

    } catch (error) {

      this.showMessage(
        'Ha ocurrido un error',
        'error'
      );

    }
  }

  async updateUserData() {

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      return;

    }

    try {

      await updateUser(this.userForm.value._id, this.userForm.value);

      this.loadUsers();

      this.showModal = false;

      this.showMessage(
        'Usuario actualizado correctamente',
        'success'
      );

    } catch (error) {

      this.showMessage(
        'Ha ocurrido un error',
        'error'
      );

    }

  }

  async deleteUserById(id: string) {

    try {

      await deleteUser(id);

      this.loadUsers();

      this.showMessage(
        'Usuario eliminado correctamente',
        'success'
      );

    } catch (error) {

      this.showMessage(
        'Ha ocurrido un error',
        'error'
      );

    }

  }

  openProfileModal(user: any) {

    let randomId = Math.floor(Math.random() * 17) + 9;

    let avatar = `https://rickandmortyapi.com/api/character/avatar/${randomId}.jpeg`;

    this.selectedUser = user;

    this.randomImage = avatar;

    this.showProfileModal = true;
  }

  showMessage(text: string, type: string) {

    this.message = text;

    this.messageType = type;

    setTimeout(() => {

      this.message = '';

      this.messageType = '';
    }, 3000);

  }


  filteredUsersByDate() {

  if (!this.startDate || !this.endDate) {
    return this.users;
  }

  return this.users.filter((user: any) => {

    const createdDate = new Date(user.createdAt);

    const start = new Date(this.startDate);

    const end = new Date(this.endDate);

    return createdDate >= start && createdDate <= end;

  });

}

}
