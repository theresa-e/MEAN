import { Routes, RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { SeattleComponent } from './seattle/seattle.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { SanJoseComponent } from './san-jose/san-jose.component';
import { ChicagoComponent } from './chicago/chicago.component';
import { PortlandComponent } from './portland/portland.component';
import { WashingtonComponent } from './washington/washington.component';
import { PhoenixComponent } from './phoenix/phoenix.component';

const routes: Routes = [
  { path: 'seattle', component: SeattleComponent },
  { path: 'sanjose', component: SanJoseComponent },
  { path: 'chicago', component: ChicagoComponent },
  { path: 'portland', component: PortlandComponent },
  { path: 'washington', component: WashingtonComponent },
  { path: 'phoenix', component: PhoenixComponent },
  { path: '**', component: PageNotFoundComponent }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
