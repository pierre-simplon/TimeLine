import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';
import { FormBuilder } from '@angular/forms';
import { Timeline } from '../interfaceTimeline';
import { Card } from '../interfaceCard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editeur',
  templateUrl: './editeur.component.html',
  styleUrls: ['./editeur.component.css']
})
export class EditeurComponent implements OnInit {
  editeurForm;
  timeLineObservable: Observable<Timeline>;
  temportaryCardlist: Card[] = [{id: 1, name: 'cardname', date: new Date(), imageUrl: 'http://google.fr' , description: 'carte google'}];
  temporaryTimeline: Timeline =  {
    id: 0 ,
    name: '' ,
    creationDate : new Date(),
    updateDate: new Date(),
    category: '',
    cardList: this.temportaryCardlist
  };

  now: Date;

  constructor(
    private formBuilder: FormBuilder,
    private gameservice: GamesService
  ) {
    const now = new Date();

    this.editeurForm = this.formBuilder.group({
      name: '',
      category: '',
      creationDate: now,
      updateDate: now
    });


  }

  ngOnInit() {
    console.log('Initialization du tableau de timeline vide: ');
    this.gameservice.TimelineToString(this.temporaryTimeline);
  }

  onEditTimeLine(value: { name: string; category: string; creationDate: Date; updateDate: Date;}) {
    console.log('affectation des variables du formulaire...')
    this.temporaryTimeline.id = 0;
    console.log('id: ' + this.temporaryTimeline.id);
    this.temporaryTimeline.name = value.name;
    console.log('name: ' + this.temporaryTimeline.name);
    this.temporaryTimeline.creationDate = value.creationDate;
    console.log('creaton date: '+ value.creationDate);
    this.temporaryTimeline.updateDate = value.updateDate;
    console.log('update date: ' + value.updateDate);
    this.temporaryTimeline.cardList = this.temportaryCardlist;
    console.log('table de cartes: ' + this.gameservice.CardTableToString(this.temportaryCardlist));
    this.temporaryTimeline.category = value.category;
    console.log('categorie: ' + value.category);
    // tslint:disable-next-line: max-line-length
    console.log('Lors de la creation la timeline du formulaire suivante est envoyée au service create: ' + this.gameservice.TimelineToString(this.temporaryTimeline));
    // tslint:disable-next-line: max-line-length
    console.log('Creation du timeline suivant retourné par httpClient: ');
    this.timeLineObservable = this.gameservice.createTimelinesTestObservable(this.temporaryTimeline);
    this.timeLineObservable.subscribe(timeline => this.temporaryTimeline = timeline);
    this.gameservice.TimelineToString(this.temporaryTimeline);
  }

}
