import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Timeline } from '../interfaceTimeline';
import { Card } from '../interfaceCard';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-editeur',
  templateUrl: './editeur.component.html',
  styleUrls: ['./editeur.component.css']
})
export class EditeurComponent implements OnInit {
  timeLineForm: FormGroup;
  cards: FormArray;
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
      cards: this.formBuilder.array([this.createEmptyCard()])
    });
  }

  onEditTimeLine(value: { name: string; category: string; creationDate: Date; updateDate: Date; }) {
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

  onNewCards(cards: FormArray) {
    console.log('debut de OnNewCards');
    console.log('le contenu du formArray cards est: ');
    this.displayFormArray(cards);
    console.log('la longueur du formArray cards est : ' + this.cards.length);
    this.temporaryCardlist = [];
    this.temporaryCard = {
      'id': 0,
      'name': '',
      'date' : new Date(),
      'imageUrl': '',
      'description': '',
      'isFirstCard': true
    };
    console.log('longueur de cards:' + this.cards.length);
    console.log(' First Card ? :' + this.firstCard);
    for (let i = 0; i < this.cards.length; i++) {
      this.temporaryCard.id = this.temporaryCardlist.length;
      this.temporaryCard.name = cards.at(i).value.name;
      this.temporaryCard.date = cards.at(i).value.date;
      this.temporaryCard.imageUrl = cards.at(i).value.imageUrl;
      this.temporaryCard.description = cards.at(i).value.description;
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
    this.cards = this.timeLineForm.get('cards') as FormArray;
    this.displayFormArray(this.cards);
    console.log('TemporaryCardListlength: ' + this.temporaryCardlist.length);
    console.log('cardlength: ' + this.cards.length);
    this.temporaryCard = {
      'id': 0,
      'name': '',
      'date' : new Date(),
      'imageUrl': '',
      'description': '',
      'isFirstCard': true
    };
    if (this.cards.length > 0) {
      console.log('Il y a plus d\'une carte');
      this.temporaryCard.id = this.temporaryCardlist.length;
      this.temporaryCard.name = this.cards.at(this.cards.length - 1).value.name;
      this.temporaryCard.date = this.cards.at(this.cards.length - 1).value.date;
      this.temporaryCard.imageUrl = this.cards.at(this.cards.length - 1).value.imageUrl;
      this.temporaryCard.description = this.cards.at(this.cards.length - 1).value.description;
      this.temporaryCard.isFirstCard = false;
      this.temporaryCardlist.push(this.temporaryCard);
      console.log('temporaryCardlist apres de la carte temporaire' + JSON.stringify(this.temporaryCardlist));
    } else {
      this.temporaryCard.id = this.temporaryCardlist.length;
      this.temporaryCard.name = this.cards.at(this.cards.length).value.name;
      this.temporaryCard.date = this.cards.at(this.cards.length).value.date;
      this.temporaryCard.imageUrl = this.cards.at(this.cards.length).value.imageUrl;
      this.temporaryCard.description = this.cards.at(this.cards.length).value.description;
      this.temporaryCard.isFirstCard = true;
      this.temporaryCardlist.push(this.temporaryCard);
      console.log('temporaryCardlist apres de la carte temporaire' + JSON.stringify(this.temporaryCardlist));
    }
   // Add a new blank card input
    this.cards.push(this.createEmptyCard());
  }

  removeCard(): void {
    this.cards = this.timeLineForm.get('cards') as FormArray;
    this.cards.removeAt(this.cards.length - 1);
    if (this.cards.length === 1) {
      this.temporaryCard.isFirstCard = true;
    }
  }

  getCards() {
    return this.timeLineForm.get('cards') as FormArray;
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
