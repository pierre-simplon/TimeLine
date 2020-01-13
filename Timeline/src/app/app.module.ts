import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
//import { AppRoutingModule } from './app-routing.module'; //TODO: ajouter routing

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FormlistComponent } from './formlist/formlist.component';
import { GamesService } from './games.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    FormlistComponent
  ],
  imports: [
    BrowserModule,
 //   AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [GamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
