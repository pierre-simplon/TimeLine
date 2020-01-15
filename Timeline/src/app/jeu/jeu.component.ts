import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GamesService } from '../games.service';
import { Timeline } from '../interfaceTimeline';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']
})
export class JeuComponent implements OnInit {
  // gamess: Timeline[];
  // name: string = 'jeu';
  // cheminImage;
  // jeuForm;
  // @Input() id;

  rnd: number = Math.floor(Math.random()*10);
  id:  number;
  timeline: Timeline;
  jeuForm;
  cheminURL;

  private games: Observable<Timeline[]>;

  constructor(
    private formBuilder: FormBuilder,
    private gameservice: GamesService,
    private routes: ActivatedRoute
  ) {
    this.jeuForm = this.formBuilder.group({
      reponse: "",
    });

    // this.gamess = this.gameservice.gamess;
    // this.games = this.gameservice.getTimelinesTestObservable();
    // console.log(this.gamess);
    // this.cheminImage = this.gamess[0].cardList[0].imageUrl;
   }



  ngOnInit() {
    let id = (this.routes.snapshot.params['id']);
    id=+id+1;

    // alert(id);
    // this.name =this.getJeuById(+id).name;
    // this.id=this.getJeuById(+id).id;
    // alert("name "+this.name);
    // alert("id "+this.id);

    this.gameservice.games.subscribe(timelineList => {
      this.timeline = timelineList.find(
        (s) => {
          return s.id === id
          .pipe(
            tap(cheminURL => this.cheminURL = this.timeline.cardList[this.rnd].imageUrl));
      //     .pipe(tap(this.cheminURL=this.timeline.cardList[this.rnd].imageUrl);
        });
      });

  }



  onReponse(card){
  //  if (timeline.cardList[0].date == card.reponse)
  this.cheminURL=this.timeline.cardList[this.rnd].imageUrl;

  console.log("Ca marche id: "+ this.timeline.cardList[1].identifierModuleUrl);
  console.log("Ca marche name: "+ this.timeline.cardList[1].name);
  console.log("Ca marche description: "+ this.timeline.cardList[1].description);
  console.log("Ca marche URL: "+ this.timeline.cardList[1].imageUrl);

  console.log("Ca marche pas date: "+ this.timeline.cardList[1].date);
  if (card.reponse == this.timeline.cardList[1].date) alert("GAGNE!");
  else alert("ESSAYES ENCORE");
  }

  getJeuById(id: number) {
    const jeu = this.gameservice.gamess.find(
      (s) => {
        return s.id === id;
      }
    );
    return jeu;
}

}
