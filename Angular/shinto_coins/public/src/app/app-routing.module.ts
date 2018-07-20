import { Routes, RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MineComponent } from './mine/mine.component';
import { BuyComponent } from './buy/buy.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'mine', component: MineComponent },
  { path: 'buy', component: BuyComponent },
  { path: '**', component: PagenotfoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
