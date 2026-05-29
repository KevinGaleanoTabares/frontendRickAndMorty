import { Component, OnInit } from '@angular/core';
import { getCharacters } from 'src/app/services/api.service';


@Component({
  selector: 'app-character-img',
  templateUrl: './character-img.component.html',
})
export class CharacterImgComponent implements OnInit {

  characters: any[] = [];
  
    currentPage: number = 1;
    totalPages: number = 1;
  
    constructor() { }
  
    async ngOnInit() {
  
      this.loadCharacters();
    }
  
      async loadCharacters() {
  
        try {
          const res = await getCharacters(this.currentPage);
  
          this.characters = res.data.results; // Explicarme que esta haciendo aqui
          this.totalPages = res.data.info.pages; // Explicarme que esta haciendo aqui
  
          console.log(res.data);
    
        } catch (error) {
        console.error(error)
      }
      } 
  
    async nextPage() {
  
      if (this.currentPage < this.totalPages) {
  
        this.currentPage++; //Que hace aca

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
  
        this.loadCharacters();
      }
    }
  
    async prevPage() {
      if (this.currentPage > 1 ) {
  
        this.currentPage--; //que hace aqui

          window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
  
        this.loadCharacters();
      }
    }

}
