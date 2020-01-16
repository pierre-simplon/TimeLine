import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; //TODO: ajouter routing

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FormlistComponent } from './formlist/formlist.component';
import { GamesService } from './games.service';
import { HttpClientModule} from '@angular/common/http';
import { JeuComponent } from './jeu/jeu.component';
import { EditeurComponent } from './editeur/editeur.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    FormlistComponent,
    JeuComponent,
    EditeurComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [GamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
