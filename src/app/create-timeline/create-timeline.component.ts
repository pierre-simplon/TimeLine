import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Timeline } from '../interfaceTimeline';
import { Card } from '../interfaceCard';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-create-timeline',
  templateUrl: './create-timeline.component.html',
  styleUrls: ['./create-timeline.component.css']
})
export class CreateTimelineComponent implements OnInit {
  timeLineForm: FormGroup;
  cardsFormArray: FormArray;
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
      cardsFormArray: this.formBuilder.array([this.createEmptyCard()])
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
    console.log('affichage du timeline apres mise à jour BD de la liste des cartes:')
    this.gameservice.TimelineToString(this.temporaryTimeline);
  }

  onPushCardsToTimeline(cardsFormArray: FormArray) {
    console.log('le contenu du formArray cardsFormArray est: ');
    this.displayFormArray(cardsFormArray);
    console.log('la longueur du formArray cardsFormArray est : ' + this.cardsFormArray.length);
    this.temporaryCardlist = [];
    this.temporaryCard = {
      'id': 0,
      'name': '',
      'date' : new Date(),
      'imageUrl': '',
      'description': '',
      'isFirstCard': true
    };
    console.log('longueur de cardsFormArray:' + this.cardsFormArray.length);
    console.log(' First Card ? :' + this.firstCard);
    for (let i = 0; i < this.cardsFormArray.length; i++) {
      this.temporaryCard.id = this.temporaryCardlist.length;
      this.temporaryCard.name = cardsFormArray.at(i).value.name;
      this.temporaryCard.date = cardsFormArray.at(i).value.date;
      this.temporaryCard.imageUrl = cardsFormArray.at(i).value.imageUrl;
      this.temporaryCard.description = cardsFormArray.at(i).value.description;
      console.log('la carte temporaire avant affectation: ' + JSON.stringify(this.temporaryCard));
      console.log('temporaryCardlist avant affectation de la carte temporaire' + JSON.stringify(this.temporaryCardlist));
      this.temporaryCardlist.push(this.temporaryCard);
      console.log('temporaryCardlist apres affectation de la carte temporaire' + JSON.stringify(this.temporaryCardlist));
    }
  }

  createEmptyCard(): FormGroup {
    return this.formBuilder.group({
    name: '',
    imageUrl: '',
    description: '',
    dateToFind: new Date(2020, 12, 12)
    });
  }

  addEmptyCardForm(): void {
    console.log('le FormArray envoyé par addEmptyCardForm est:');

    // Initialize the FormArray of Cards
    this.cardsFormArray = this.timeLineForm.get('cardsFormArray') as FormArray;

    /* DEBUG
    this.displayFormArray(this.cardsFormArray);
    console.log('TemporaryCardListlength: ' + this.temporaryCardlist.length);
    console.log('cardlength: ' + this.cardsFormArray.length);
    */

    // Initialize an empty Temporary Card
    this.temporaryCard = {
      'id': 0,
      'name': '',
      'date' : new Date(),
      'imageUrl': '',
      'description': '',
      'isFirstCard': true
    };
    let adjustSize = 0;

    // check and Update property of card if it's the first card of the form
    if (this.cardsFormArray.length > 0) {
      this.temporaryCard.isFirstCard = false;
      adjustSize = 1;
    } else {
      this.temporaryCard.isFirstCard = true;
      adjustSize = 0;
    }

    this.temporaryCard.id = this.temporaryCardlist.length;
    this.temporaryCard.name = this.cardsFormArray.at(this.cardsFormArray.length - adjustSize).value.name;
    this.temporaryCard.date = this.cardsFormArray.at(this.cardsFormArray.length - adjustSize).value.date;
    this.temporaryCard.imageUrl = this.cardsFormArray.at(this.cardsFormArray.length - adjustSize).value.imageUrl;
    this.temporaryCard.description = this.cardsFormArray.at(this.cardsFormArray.length - adjustSize).value.description;

    this.temporaryCardlist.push(this.temporaryCard);
    console.log('temporaryCardlist apres de la carte temporaire' + JSON.stringify(this.temporaryCardlist));

   // Add a new blank card input
    this.cardsFormArray.push(this.createEmptyCard());
  }

  removeCard(): void {
    //this.cardsFormArray = this.timeLineForm.get('cardsFormArray') as FormArray;
    this.cardsFormArray.removeAt(this.cardsFormArray.length - 1);
    if (this.cardsFormArray.length === 1) {
      this.temporaryCard.isFirstCard = true;
    }
  }

  getCards() {
    return this.timeLineForm.get('cardsFormArray') as FormArray;
  }

  displayFormArray(arrayOfCards: FormArray) {
    for (let i = 0; i < arrayOfCards.length; i++) {
      console.log('Affichage du FormArray: ----');
      console.log('carte N°' + i);
      console.log('la valeur du nom de la carte: ' + arrayOfCards.at(i).value.name);
      console.log('Fin du FormArray: ----');
    }
  }

}
