import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-character-table',
  templateUrl: './character-table.component.html',
})

export class CharacterTableComponent implements OnInit {
    @Input() characters: any[] = [];

    @Input() characterSearch: string = '';

    filteredCharacters() {
            
      if (!this.characterSearch) {
        return this.characters;
      }
  
      const text = this.characterSearch.toLowerCase();
  
      return this.characters.filter((c: any) =>
        c.name.toLowerCase().includes(text) || c.species.toLowerCase().includes(text)
      );
    }

  constructor() { }

  ngOnInit(): void {
  }

}
