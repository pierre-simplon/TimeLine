import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainTimelineComponent } from './main-timeline/main-timeline.component';
import { PlayTimelineComponent } from './play-timeline/play-timeline.component';
import { CreateTimelineComponent } from './create-timeline/create-timeline.component';
import { CreateCardsComponent } from './create-cards/create-cards.component';




const routes: Routes = [
  { path: '', component: MainTimelineComponent },
  { path: 'jeu/:id', component: PlayTimelineComponent},
  { path: 'createTimeline', component: CreateTimelineComponent},
  { path: 'createCards', component: CreateCardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
