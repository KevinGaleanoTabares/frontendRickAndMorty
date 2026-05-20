import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
})

export class UserTableComponent implements OnInit {

  @Input() users: any[] = [];

  @Input() userSearch: string = '';

  @Output()
  editUser = new EventEmitter<any>();

  @Output()
  deleteUser = new EventEmitter<string>();

  @Output()
  viewUser = new EventEmitter<any>();

     formatDate(date:string){
    return DateTime.fromISO(date).toFormat('dd/MM/yyyy');
  }

  filteredUsers() {
      
      if (!this.userSearch) {
        return this.users;
      }
  
      const text = this.userSearch.toLowerCase();
  
      return this.users.filter((u: any) =>
        u.name.toLowerCase().includes(text) || u.email.toLowerCase().includes(text) || u.age.toString().includes(text)
      );
    }

  constructor() { }

  ngOnInit(): void {
  }

}