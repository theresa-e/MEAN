import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoldService } from './gold.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GoldService],
  bootstrap: [AppComponent]
})
export class AppModule { }
