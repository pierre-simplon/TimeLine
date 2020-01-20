import { Component, OnInit, Output } from '@angular/core';
import { GamesService } from '../games.service';
import { FormBuilder } from '@angular/forms';
import { Timeline } from '../interfaceTimeline';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formlist',
  templateUrl: './formlist.component.html',
  styleUrls: ['./formlist.component.css']
})
export class FormlistComponent implements OnInit {
  gameList = this.gameService.gamesObservable;
  gameForm;
  games: Observable<Timeline[]>;
  timeLineObservable: Observable<Timeline>;
  deletedTimeline: Timeline = {
    id: 1 ,
    name: '' ,
    creationDate : new Date(),
    updateDate: new Date(),
    category: '',
    cardList: []
  };

  constructor(
    private gameService: GamesService
  ) {
    this.games = this.gameService.getTimelinesTestObservable();
  }

  ngOnInit() {
  }

  onNewTimeLine() {
    console.log('NewTimeLine!');
  }


  deletee() {
    this.timeLineObservable = this.gameService.deleteTimelinesTestObservable(2);
    this.timeLineObservable.subscribe(timeline => this.deletedTimeline = timeline);
    this.gameService.TimelineToString(this.deletedTimeline);
  }




}
