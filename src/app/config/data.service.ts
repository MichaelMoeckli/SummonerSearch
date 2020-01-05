import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, pipe, Observable, of } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { SummonerProfile } from '../../../server/lib/models/SummonerProfile-model';
import { MatchInfo } from '../../../server/lib/models/Match/MatchInfo.model';
import { Match } from '../../../server/lib/models/Match/Match.model';
import { Team } from '../../../server/lib/models/Match/Team.model';
import { Participant } from '../../../server/lib/models/Match/Participant.model';
import { ParticipantIdentity } from '../../../server/lib/models/Match/ParticipantIdentity.model';
import { MatchHistory } from 'server/lib/models/Match/MatchHistory.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public summonerProfileURL = 'http://localhost:4200/api/summoner/profile';
  public matchHistoryURL = 'http://localhost:4200/api/summoner/matches';

  constructor(private http: HttpClient) {  }

  public getSummonerName(name: string): Observable<SummonerProfile>{ 
    return this.http.get<SummonerProfile>(`${this.summonerProfileURL}/${name}`).pipe(catchError(_ => of(null)))
  }

  public getMatchHistory(accountID: string): Observable<MatchHistory> { 
    return this.http.get<MatchHistory>(`${this.matchHistoryURL}/${accountID}`).pipe(catchError(_ => of(null)))
  }

}
