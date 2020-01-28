import { Injectable } from "@angular/core";
import { Timeline } from "./interfaceTimeline";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { HttpHeaders } from '@angular/common/http';
import { Card } from './interfaceCard';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'my-auth-token' }) };

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  games: Timeline[] = [];
  cardList: Card[];
  editedCardList: Card[];
  gamesObservable: Observable<Timeline[]>;
  editedTimeline: Timeline;
  deletedTimeline: Timeline;

  constructor(private httpClient: HttpClient) {
    this.gamesObservable = this.getTimelinesObservable();
  }

  /**
   * Get Timelines
   * @return : Liste des timelines
   */
  getTimelinesObservable(): Observable<Timeline[]> {
    return this.httpClient
      .get<Timeline[]>("http://localhost:8080/api/timeline")
      .pipe(tap(dataList => (this.games = dataList)));
  }

  /**
   *
   * @param tid : Timeline id
   * @return: Card array corresponding to the Timeline tid
   */
  getCardListObservable(tid): Observable<Card[]> {
    return this.httpClient
      .get<Card[]>(`/api/timeline/${tid}/card`)
      .pipe(tap(dataList => (this.cardList = dataList)));
  }


  deleteTimelinesObservable(i: number): Observable<Timeline> {
    return this.httpClient
    .delete<Timeline>('http://localhost:8080/api/timeline/' + i)
    .pipe(tap(returnedTimeline => (this.deletedTimeline = returnedTimeline)));
  }

  /**
   *
   * @param timeline: jeu a créér en BD
   * @return: jeu
   */
  createTimelinesObservable(timeline: Timeline): Observable<Timeline> {
    return this.httpClient
    .post<Timeline>('http://localhost:8080/api/timeline', timeline)
    .pipe(tap(returnedTimeline => (this.editedTimeline = returnedTimeline)));
  }

  /**
   *
   * @param cardList : tableau de carte
   * @param tid : id du timeline ou les cartes seront affectées
   */
  createCardListObservable(cardList: Card[], tid: number): Observable<Card[]> {
    return this.httpClient
      .post<Card[]>(`/api/timeline/${tid}/card`, cardList)
      .pipe(tap(returnedcardlist => (this.editedCardList = returnedcardlist)));
  }

  TimelineToString(timeline: Timeline){
    console.log('Voici les caracteristiques du timeline: ');
    console.log(timeline.id);
    console.log(timeline.name);
    console.log(timeline.creationDate);
    console.log(timeline.updateDate);
    console.log(timeline.category);
    this.CardTableToString(timeline.cardList);
  }

  CardTableToString(CardTable: Card[]){
    if (CardTable.length > 0) {
    console.log('Voici le tableau des cartes: ');
    for (const card of CardTable){
      console.log('Carte id: ' + card.id);
      console.log('Carte name: ' + card.name);
      console.log('Carte date: ' + card.date);
      console.log('Carte URL: ' + card.imageUrl);
      console.log('Carte description: ' + card.description);
    }
    } else { console.log('Le tableau des cartes est vide'); }
  }
}
