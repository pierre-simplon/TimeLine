import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';
import { FormBuilder } from '@angular/forms';
import { Timeline } from '../interfaceTimeline';

@Component({
  selector: 'app-editeur',
  templateUrl: './editeur.component.html',
  styleUrls: ['./editeur.component.css']
})
export class EditeurComponent implements OnInit {
  editeurForm;
  temporaryTimeline: Timeline;

  constructor(
    private formBuilder: FormBuilder,
    private routes: ActivatedRoute,
    private gameservice: GamesService
  ) {

    this.editeurForm = this.formBuilder.group({
      name: "",
      category: "",
      creationDate: "",
      updateDate: ""
    })
  }

  ngOnInit() {
  }

  onEditTimeLine() {
    alert("edit TODO");
  }

  ajouter() {
    this.temporaryTimeline.id = 0;
    this.temporaryTimeline.cardList = [];
    this.temporaryTimeline.name = this.editeurForm.name;
    this.temporaryTimeline.creationDate = new Date(2019, 12, 11);
    this.temporaryTimeline.updateDate = new Date(2019, 12, 11);
    this.temporaryTimeline.cardList = [];
    this.temporaryTimeline.category = this.editeurForm.category;
    this.gameservice.createTimelinesTestObservable(this.temporaryTimeline);
    console.log(this.editeurForm);
  }

}
