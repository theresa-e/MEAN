import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { NewAuthorComponent } from './new-author/new-author.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'newAuthor', component: NewAuthorComponent },
  { path: '**', component: PagenotfoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
