import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Timeline } from '../interfaceTimeline';
import { Card } from '../interfaceCard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editeur',
  templateUrl: './editeur.component.html',
  styleUrls: ['./editeur.component.css']
})
export class EditeurComponent implements OnInit {
  timeLineForm: FormGroup;
  timeLineObservable: Observable<Timeline>;
  temporaryCardlist: Card[] = [{id: 1,
    name: 'cardname',
    dateToFind: new Date(2019, 12, 11),
    imageUrl: 'http://google.fr' ,
    description: 'carte google'}];
  temporaryTimeline: Timeline =  {
    id: 0 ,
    name: '' ,
    creationDate : new Date(2019, 12, 11),
    updateDate: new Date(2019, 12, 11),
    category: '',
    cardList: this.temporaryCardlist
  };
  temporaryCard: Card = {
    id: 0,
    name: '',
    dateToFind: new Date(2019, 12, 11),
    imageUrl: '',
    description: ''
  };
  cards: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private gameservice: GamesService
  ) {}

  ngOnInit() {
    this.timeLineForm = this.formBuilder.group({
      name: '',
      category: '',
      creationDate: new Date(2019, 12, 11),
      updateDate: new Date(2019, 12, 11),
      cards: this.formBuilder.array([this.createCard()])
    });
  }

  onEditTimeLine(value: { name: string; category: string; creationDate: Date; updateDate: Date; }) {
    console.log('affectation des variables du formulaire...');
    this.temporaryTimeline.id = 0;
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
    this.gameservice.TimelineToString(this.temporaryTimeline);
  }

  onNewCards() {
    console.log('debut de OnNewCards');
    console.log('la longueur du tableau de formulaire de carte est : ' + this.cards.length);
    console.log('le tableau des cartes:' + this.cards);
    console.log('la carte temporaire avant affectation: ' + JSON.stringify(this.temporaryCard));
    for (let i = 1; i < this.cards.length; i++) {
      this.temporaryCard.id = this.cards.length - 1;
      console.log('l\'id de la carte temporaire apres affectation de la longueur cards: ' +  this.temporaryCard.id);
      console.log('la carte temporaire i=' + (i - 1) + ' a comme nom d\'affectation:' + this.cards[(i - 1)].name);
      this.temporaryCard.name = this.cards[i].name;
      this.temporaryCard.dateToFind = new Date(2020, 12, 12);
      this.temporaryCard.imageUrl = this.cards[i].imageUrl;
      this.temporaryCard.description = this.cards[i].description;
    }
  }

  createCard(): FormGroup {
    return this.formBuilder.group({
    name: '',
    imageUrl: '',
    description: '',
    dateToFind: new Date(2020, 12, 12)
    });
  }

  addCard(): void {
    this.cards = this.timeLineForm.get('cards') as FormArray;
    this.cards.push(this.createCard());
    console.log('Voici le nouveau contenu du tableau de cards: ' + this.displayFormArray(this.cards));
  }

  removeCard(): void {
    this.cards = this.timeLineForm.get('cards') as FormArray;
    this.cards.removeAt(this.cards.length - 1);
  }

  getCards() {
    return this.timeLineForm.get('cards') as FormArray;
  }

  displayFormArray(arrayOfCard: FormArray) {
    for (let i = 0; i < arrayOfCard.length; i++) {
      console.log('carte N°' + i);
      console.log('la valeur du nom de la carte: ' + arrayOfCard.at(i).value.name);
    }
  }

}
