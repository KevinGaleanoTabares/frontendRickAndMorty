import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
})

export class CharacterSearchComponent implements OnInit {

  @Output()
  searchCharacter = new EventEmitter<string>();

  searchText = '';

  search() {

    this.searchCharacter.emit(this.searchText);

  }

  constructor() { }

  ngOnInit(): void {
  }

}