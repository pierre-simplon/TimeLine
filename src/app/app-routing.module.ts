import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mainTimelineComponent } from './main-timeline/main-timeline.component';
import { playTimelineComponent } from './play-timeline/play-timeline.component';
import { CreateTimelineComponent } from './create-timeline/create-timeline.component';




const routes: Routes = [
  { path: '', component: mainTimelineComponent },
  { path: 'jeu/:id', component: playTimelineComponent},
  { path: 'createTimeline', component: CreateTimelineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
