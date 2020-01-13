import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { FormBuilder } from '@angular/forms';
import { Timeline } from '../interfaceTimeline';

@Component({
  selector: 'app-formlist',
  templateUrl: './formlist.component.html',
  styleUrls: ['./formlist.component.css']
})
export class FormlistComponent implements OnInit {
  games = [];
  gameList = this.gameService.games;
  gameForm;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GamesService
  ) {
    this.games = this.gameService.games;
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
}
