import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormlistComponent } from './formlist/formlist.component';
import { JeuComponent } from './jeu/jeu.component';
import { CreateTimelineComponent } from './create-timeline/create-timeline.component';




const routes: Routes = [
  { path: '', component: FormlistComponent },
  { path: 'jeu/:id', component: JeuComponent},
  { path: 'createTimeline', component: CreateTimelineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
