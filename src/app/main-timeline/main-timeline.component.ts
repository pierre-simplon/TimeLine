import { Component, OnInit, Output } from '@angular/core';
import { GamesService } from '../games.service';
import { FormBuilder } from '@angular/forms';
import { Timeline } from '../interfaceTimeline';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formlist',
  templateUrl: './main-timeline.component.html',
  styleUrls: ['./main-timeline.component.css']
})
export class MainTimelineComponent implements OnInit {
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
    this.games = this.gameService.getTimelinesObservable();
  }

  ngOnInit() {
  }

  onNewTimeLine() {
    console.log('NewTimeLine!');
  }

  delete(i) {
    this.gameService.deleteTimelinesObservable(i).subscribe(() => {this.games = this.gameService.getTimelinesObservable(); });
  }
}
