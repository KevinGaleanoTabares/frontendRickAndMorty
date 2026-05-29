import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { CharacterSearchComponent } from './components/character-search/character-search.component';
import { CharacterTableComponent } from './components/character-table/character-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CharactersComponent } from './components/characters/characters.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CharacterImgComponent } from './components/character-img/character-img.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    // DashboardComponent,
    UserSearchComponent,
    UserTableComponent,
    CharacterSearchComponent,
    CharacterTableComponent,
    PaginatorComponent,
    CharactersComponent,
    UsersComponent,
    ProfileComponent,
    CharacterImgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
