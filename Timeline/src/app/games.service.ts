import { Injectable } from '@angular/core';
import { Timeline } from './interfaceTimeline';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  games: Timeline[] =
  [{
      "id": 1,
      "name": "Numérique",
      "creationDate": "2019-12-12",
      "updateDate": "2019-12-12",
      "category": "CNF"
    },
    {
      "id": 2,
      "name": "Data",
      "creationDate": "2019-12-12",
      "updateDate": "2019-12-12",
      "category": "Data"
    }
  ];

  constructor() { }
}
