import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SeattleComponent } from './seattle/seattle.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SanJoseComponent } from './san-jose/san-jose.component';
import { ChicagoComponent } from './chicago/chicago.component';
import { PortlandComponent } from './portland/portland.component';
import { WashingtonComponent } from './washington/washington.component';
import { PhoenixComponent } from './phoenix/phoenix.component';

@NgModule({
  declarations: [
    AppComponent,
    SeattleComponent,
    PageNotFoundComponent,
    SanJoseComponent,
    ChicagoComponent,
    PortlandComponent,
    WashingtonComponent,
    PhoenixComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
