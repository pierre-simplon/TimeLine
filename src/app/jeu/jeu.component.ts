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


  rnd: number;
  id: number;
  timeline: Timeline;
  jeuForm;
  cheminURL;
  indexCarteEnCours;
  cartesTrouvees: Card[] = [];
  cartesADeviner: Card[] = [];

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


    this.gameservice.gamesObservable.subscribe(timelineList => {
      this.timeline = timelineList.find(
        (s) => {
          return s.id === id;
        });
      this.cartesADeviner = this.timeline.cardList;
      this.nouvelleCarte();
    });
  }



  onReponse(card) {
   if (card.reponse === this.cartesADeviner[this.indexCarteEnCours].dateToFind) {
     console.log('la date saisie est: ' + card.reponse );
     console.log('la date a deviner est: ' + this.cartesADeviner[this.indexCarteEnCours].dateToFind );
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

 nouvelleCarte(){
  this.rnd = this.getRandomInt(this.cartesADeviner.length);
  this.indexCarteEnCours=this.rnd;
  this.cheminURL = this.cartesADeviner[this.indexCarteEnCours].imageUrl;
  console.log("Ca marche id: " + this.timeline.cardList[this.indexCarteEnCours].id);
  console.log("Ca marche name: " + this.timeline.cardList[this.indexCarteEnCours].name);
  console.log("Ca marche description: " + this.timeline.cardList[this.indexCarteEnCours].description);
  console.log("Ca marche URL: " + this.timeline.cardList[this.indexCarteEnCours].imageUrl);
  console.log("Année de la date de la carte: " + this.timeline.cardList[this.indexCarteEnCours].dateToFind);
  console.log("Taile du tableau: "+this.cartesADeviner.length);
 }

 getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

 finDeJeu(){
  if (this.cartesADeviner.length==1) {
    alert('Il n\'y a plus de carte'); //TODO cacher le bouton deviner
  } else {
    this.nouvelleCarte();
  }
 }

}
