import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoldService } from './gold.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GoldService],
  bootstrap: [AppComponent]
})
export class AppModule { }
