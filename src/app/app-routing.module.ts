import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
// import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
// import { CharacterTableComponent } from 'src/app/components/character-table/character-table.component';
// import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { AuthGuard } from './guards/auth.guard';
import { CharactersComponent } from 'src/app/components/characters/characters.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';

const routes: Routes = [

  { 
    path : '', 
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  { 
    path : 'login', 
    component: LoginComponent 
  },
  { 
    path : 'register', 
    component: RegisterComponent 
  },


  
  // { 
  //   path : 'dashboard', 
  //   component: DashboardComponent, 
  //   canActivate: [AuthGuard] 
  // },
  { 
    path: 'characters', 
    component: CharactersComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'users', 
    component: UsersComponent, 
    canActivate: [AuthGuard]
  },
  
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
