import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Timeline } from '../interfaceTimeline';
import { Card } from '../interfaceCard';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-create-timeline',
  templateUrl: './create-timeline.component.html',
  styleUrls: ['./create-timeline.component.css']
})
export class CreateTimelineComponent implements OnInit {
  timeLineForm: FormGroup;

  timeLineObservable: Observable<Timeline>;
  temporaryCardlist: Card[];
  temporaryTimeline: Timeline;
  temporaryCard: Card;
  firstCard: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private gameservice: GamesService
  ) {}

  ngOnInit() {
    this.temporaryCardlist  = [];
    this.temporaryTimeline = {
      id: 0 ,
      name: '' ,
      creationDate : new Date(),
      updateDate: new Date(),
      category: '',
      cardList: []
    };
    this.timeLineForm = this.formBuilder.group({
      name: '',
      category: '',
      creationDate: new Date(),
      updateDate: new Date(),
      cardsFormArray: this.formBuilder.array([this.gameservice.createEmptyCard()])
    });
  }

  onCreateTimeLine(value: { name: string; category: string; creationDate: Date; updateDate: Date; }) {
    console.log('affectation des variables du formulaire...');
    this.temporaryTimeline.id = this.gameservice.games.length;
    console.log('id: ' + this.temporaryTimeline.id);
    this.temporaryTimeline.name = value.name;
    console.log('name: ' + this.temporaryTimeline.name);
    this.temporaryTimeline.creationDate = value.creationDate;
    console.log('creaton date: ' + value.creationDate);
    this.temporaryTimeline.updateDate = value.updateDate;
    console.log('update date: ' + value.updateDate);
    this.temporaryTimeline.cardList = this.temporaryCardlist;
    console.log('table de cartes: ' + this.gameservice.CardTableToString(this.temporaryCardlist));
    this.temporaryTimeline.category = value.category;
    console.log('categorie: ' + value.category);
    // tslint:disable-next-line: max-line-length
    console.log('Lors de la creation la timeline du formulaire suivante est envoyée au service create: ' + this.gameservice.TimelineToString(this.temporaryTimeline));
    // tslint:disable-next-line: max-line-length
    console.log('Creation du timeline suivant retourné par httpClient: ');
    this.gameservice.createTimelinesObservable(this.temporaryTimeline).subscribe(timeline => this.temporaryTimeline = timeline);
    console.log('affectation de liste des carte au timeline en BD');
    this.gameservice.createCardListObservable(this.temporaryCardlist, this.temporaryTimeline.id)
    .subscribe((cardlist: Card[]) => this.temporaryCardlist = cardlist);
    console.log('affichage du timeline apres mise à jour BD de la liste des cartes:');
    this.gameservice.TimelineToString(this.temporaryTimeline);
  }


}
