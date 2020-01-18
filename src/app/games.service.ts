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
  games: Observable<Timeline[]>;

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
    return this.httpClient.delete("http://localhost:8080/api/timeline/1", httpOptions);
  }

  createTimelinesTestObservable(timeline: Timeline) {
    return this.httpClient
      .post<Timeline>("http://localhost:8080/api/timeline", timeline, httpOptions);

  }


}
