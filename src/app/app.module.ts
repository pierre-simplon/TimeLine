import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainTimelineComponent } from './main-timeline/main-timeline.component';
import { GamesService } from './games.service';
import { HttpClientModule} from '@angular/common/http';
import { PlayTimelineComponent } from './play-timeline/play-timeline.component';
import { CreateTimelineComponent } from './create-timeline/create-timeline.component';
import { CreateCardsComponent } from './create-cards/create-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MainTimelineComponent,
    PlayTimelineComponent,
    CreateTimelineComponent,
    CreateCardsComponent
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
