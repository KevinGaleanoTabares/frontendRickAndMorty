import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
})
export class UserSearchComponent implements OnInit {

  searchText: string = '';

  @Output()
  search = new EventEmitter<string>();

  @Output()
  addUser = new EventEmitter<void>();

  openModal(){
  this.addUser.emit();
}

    searchUser() {
    this.search.emit(
      this.searchText
    );
  }

  constructor() { }

  ngOnInit(): void {
  }

}
