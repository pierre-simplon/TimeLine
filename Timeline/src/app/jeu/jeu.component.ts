import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']
})
export class JeuComponent implements OnInit {


  jeuForm;

  constructor(
    private formBuilder: FormBuilder,
    private gameservice: GamesService
  ) {
    this.jeuForm = this.formBuilder.group({
      reponse: "",
    });
   }

  ngOnInit() {
  }

  onReponse(){
    alert("Ca marche");
  }

}
