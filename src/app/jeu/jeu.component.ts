import { Component, OnInit, Input, ModuleWithComponentFactories, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GamesService } from '../games.service';
import { Timeline } from '../interfaceTimeline';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Card } from '../interfaceCard';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']
})
export class JeuComponent implements OnInit, OnDestroy {
  rnd: number;
  id: number;
  timeline: Timeline;
  jeuForm;
  cheminURL;
  indexCarteEnCours;
  cartesTrouvees: Card[] = [];
  cartesADeviner: Card[] = [];
  gamesSubscription: Subscription;
  gameOver: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private gameservice: GamesService,
    private routes: ActivatedRoute
  ) {
    this.jeuForm = this.formBuilder.group({
      reponse: '',
    });
  }

  ngOnInit() {
    let id = (this.routes.snapshot.params['id']);
    id = +id + 1;
    this.gameOver = false;

    // Gather timeline & cards list from DB and then launch a first guess
    this.gamesSubscription = this.gameservice.gamesObservable
    .subscribe(timelineList => {this.timeline = timelineList.find((s) => s.id === id);
                                this.cartesADeviner = this.timeline.cardList;
                                this.nouvelleCarte();
    });
  }

  ngOnDestroy() {
    this.gamesSubscription.unsubscribe();
  }

  getDateYear(card: Card) {
    return new Date(card.date).getFullYear();
  }

  onReponse(card) {
    const anneeCarteADeviner = this.getDateYear(this.cartesADeviner[this.indexCarteEnCours]);
    console.log('la date saisie est : ' + card.reponse);
    console.log('la date a deviner est: ' + anneeCarteADeviner);
    if (card.reponse === anneeCarteADeviner.toString()) {
     this.winner(this.indexCarteEnCours);
   } else { alert('ESSAYES ENCORE'); }
 }

 getJeuById(id: number) {
   const jeu = this.gameservice.games.find(
     (s) => {
       return s.id === id;
     }
   );
   return jeu;
 }

 winner(index){
   this.cartesTrouvees.push(this.timeline.cardList[index]);
   this.cartesADeviner.splice(index, 1);
   this.finDeJeu();
 }

 nouvelleCarte() {
  this.rnd = this.getRandomInt(this.cartesADeviner.length);
  this.indexCarteEnCours = this.rnd;
  this.cheminURL = this.cartesADeviner[this.indexCarteEnCours].imageUrl;
  console.log('cardlist stringify' + JSON.stringify(this.timeline.cardList));
 }

 getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

 finDeJeu(){
  if (this.cartesADeviner.length === 1) {
    this.gameOver = true;
  } else {
    this.nouvelleCarte();
  }
 }

}
