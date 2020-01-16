import { Component, OnInit, Input, ModuleWithComponentFactories } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GamesService } from '../games.service';
import { Timeline } from '../interfaceTimeline';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Card } from '../interfaceCard';

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

  rnd: number = Math.floor(Math.random() * 10);
  id: number;
  timeline: Timeline;
  jeuForm;
  cheminURL;
  indexCarteEnCours;
  cartesTrouvees: Card[] = [];
  cartesADeviner: Card[] = [];

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
    id = +id + 1;

    // alert(id);
    // this.name =this.getJeuById(+id).name;
    // this.id=this.getJeuById(+id).id;
    // alert("name "+this.name);
    // alert("id "+this.id);

    this.gameservice.games.subscribe(timelineList => {
      this.timeline = timelineList.find(
        (s) => {
          return s.id === id;
          //     .pipe(
          //      tap(cheminURL => this.cheminURL = this.timeline.cardList[this.rnd].imageUrl));
          //     .pipe(tap(this.cheminURL=this.timeline.cardList[this.rnd].imageUrl);

          alert("16")
        });
      this.cartesADeviner = this.timeline.cardList;
      this.nouvelleCarte();
    });


    /*
    alert("ici");
    this.rnd = Math.floor(Math.random() * 10);
    this.cheminURL = this.timeline.cardList[this.rnd].imageUrl;

  */ }



  onReponse(card) {
   /*
 this.rnd = Math.floor(Math.random() * 10);
    this.cheminURL = this.timeline.cardList[this.rnd].imageUrl;
*/
   console.log("Ca marche pas date: " + this.timeline.cardList[this.rnd].date);
   if (card.reponse == this.timeline.cardList[this.rnd].date) {
     this.winner(this.indexCarteEnCours);
   } else { alert('ESSAYES ENCORE'); }
 }

 getJeuById(id: number) {
   const jeu = this.gameservice.gamess.find(
     (s) => {
       return s.id === id;
     }
   );
   return jeu;
 }

 winner(index){
   this.cartesTrouvees.push(this.timeline.cardList[index]);
   this.cartesADeviner.splice(index,1);
   console.log("Cartes à devinerthis.cartesADeviner");
   this.finDeJeu();
   console.log("Taile du tableau: "+this.cartesADeviner.length);
 }

 nouvelleCarte(){
  this.rnd = this.getRandomInt(this.cartesADeviner.length);
  this.indexCarteEnCours=this.rnd;
  this.cheminURL = this.cartesADeviner[this.indexCarteEnCours].imageUrl;
  console.log("Ca marche id: " + this.timeline.cardList[this.rnd].identifierModuleUrl);
  console.log("Ca marche name: " + this.timeline.cardList[this.rnd].name);
  console.log("Ca marche description: " + this.timeline.cardList[this.rnd].description);
  console.log("Ca marche URL: " + this.timeline.cardList[this.rnd].imageUrl);
  console.log("Ca marche pas date: " + this.timeline.cardList[this.rnd].date);
  console.log("Taile du tableau: "+this.cartesADeviner.length);
 }

 getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

 finDeJeu(){
  if (this.cartesADeviner.length==1) {
    alert("Il n'y a plus de carte"); //TODO cacher le bouton deviner
  } else {
    this.nouvelleCarte();
  }
 }

}
