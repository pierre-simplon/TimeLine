import { Injectable } from "@angular/core";
import { Timeline } from "./interfaceTimeline";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";


import { HttpHeaders } from '@angular/common/http';




const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'my-auth-token' }) };





@Injectable({
  providedIn: "root"
})
export class GamesService {
  gamess: Timeline[] = [];
  games: Observable<
    Timeline[]
  >; /* =
 [{
      "id": 1,
      "name ": "Numérique",
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
*/

  constructor(private httpClient: HttpClient) {
    this.getTimelinesTestObservable();
    this.games = this.getTimelinesTestObservable();
  }

  /**
   * Get Timelines
   * @return : Liste des timelines
   */
  getTimelinesTestObservable(): Observable<Timeline[]> {
    return this.httpClient
      .get<Timeline[]>("http://localhost:8080/api/timeline")
      .pipe(tap(dataList => (this.gamess = dataList)));
  }


  deleteTimelinesTestObservable(i) {
    alert("et par ici " + i);
    return this.httpClient.delete("http://localhost:8080/api/timeline/1", httpOptions);
    /* return this.httpClient
     .delete<Timeline[]>("http://localhost:8080/api/timeline/1")*/
  }



  createTimelinesTestObservable(timeline: Timeline) {
    alert("et par ici+icreate");

    return this.httpClient
      .post<Timeline>("http://localhost:8080/api/timeline", timeline, httpOptions);

  }


}
