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
/*

let Newjeu:Timeline;

Newjeu.name=this.editeurForm.reponseJeu;
Newjeu.category=this.editeurForm.reponseCategorie;
Newjeu.creationDate="2020-01-16";
Newjeu.updateDate="2020-01-16";


this.Timeline.

*/
  ngOnInit() {
  }

  onEditTimeLine() {

    alert("edit");
  }



  ajouter() {


    alert("edit222222");
    this.temporaryTimeline.id=0;
    this.temporaryTimeline.cardList=[];
    this.temporaryTimeline.name=this.editeurForm.name;
    this.gameservice.createTimelinesTestObservable(this.temporaryTimeline);
    console.log(this.editeurForm);

  }





}
