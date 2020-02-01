import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Card } from '../interfaceCard';
import { Timeline } from '../interfaceTimeline';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-create-cards',
  templateUrl: './create-cards.component.html',
  styleUrls: ['./create-cards.component.css']
})
export class CreateCardsComponent implements OnInit {
  cardsFormArray: FormArray;
  cardFormArrayIndex: FormGroup;
  temporaryCardlist: Card[];
  temporaryCard: Card;
  firstCard: boolean;
  timeLineForm: FormGroup;
  gameService: any;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    const emptyCard: Card = this.gameService.createEmptyCard();
    this.cardFormArrayIndex = this.formBuilder.group({
      name: '',
      category: '',
      creationDate: new Date(),
      updateDate: new Date(),
      cardsFormArray: this.formBuilder.array([emptyCard])
    });
  }


  onPushCardsToTimeline(cardsFormArray: FormArray) {
    console.log('le contenu du formArray cardsFormArray est: ');
    this.displayFormArray(cardsFormArray);
    console.log('la longueur du formArray cardsFormArray est : ' + this.cardsFormArray.length);
    this.temporaryCardlist = [];
    this.temporaryCard = {
      id: 0,
      name: '',
      date : new Date(),
      imageUrl: '',
      description: '',
      isFirstCard: true
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
      id: 0,
      name: '',
      date : new Date(),
      imageUrl: '',
      description: '',
      isFirstCard: true
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
    this.cardsFormArray.push(this.gameService.createEmptyCard());
  }

  removeCard(): void {
    // this.cardsFormArray = this.timeLineForm.get('cardsFormArray') as FormArray;
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
