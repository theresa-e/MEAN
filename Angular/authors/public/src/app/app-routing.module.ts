import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { NewAuthorComponent } from './new-author/new-author.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'newAuthor', component: NewAuthorComponent },
  { path: '**', component: HomeComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
