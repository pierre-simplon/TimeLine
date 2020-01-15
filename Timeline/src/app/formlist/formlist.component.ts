import { Component, OnInit, Output } from '@angular/core';
import { GamesService } from '../games.service';
import { FormBuilder } from '@angular/forms';
import { Timeline } from '../interfaceTimeline';
import { Observable } from 'rxjs';
/*
import { deleteTimelinesTestObservable() } from '../games.service';
*/
@Component({

  selector: 'app-formlist',
  templateUrl: './formlist.component.html',
  styleUrls: ['./formlist.component.css']
})
export class FormlistComponent implements OnInit {
  private games: Observable<Timeline[]>;
  gameList = this.gameService.games;
  gameForm;
  gamess;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GamesService
  ) {
    this.games = this.gameService.getTimelinesTestObservable();
    this.gameForm = this.formBuilder.group({
      id: 0,
      name: 'toto',
      creationDate: "2020-01-12",
      updateDate: "2020-01-12",
      category: 'Pierre&Philippe'
    })
   }

  ngOnInit() {
  }

  onNewTimeLine()
  {
    console.log('NewTimeLine!');
  }


  deletee(i){
      alert("Il est passé par la   "+i);
      this.gameService.deleteTimelinesTestObservable(i);
      alert("Il est passé par la aussi ");

}
}
