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
import { SummonerStats } from 'server/lib/models/SummonerStats.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public summonerProfileURL = 'http://localhost:4200/api/summoner/profile';
  public matchHistoryURL = 'http://localhost:4200/api/summoner/matches';
  public summonerStatsUrl = 'http://localhost:4200/api/summoner/stats'

  constructor(private http: HttpClient) {  }

  public getSummonerName(name: string): Observable<SummonerProfile>{ 
    return this.http.get<SummonerProfile>(`${this.summonerProfileURL}/${name}`).pipe(catchError(_ => of(null)))
  }

  public getMatchHistory(accountID: string): Observable<MatchHistory> { 
    return this.http.get<MatchHistory>(`${this.matchHistoryURL}/${accountID}`).pipe(catchError(_ => of(null)))
  }

  public getSummonerStats(accountID: string): Observable<SummonerStats> { 
    return this.http.get<SummonerStats>(`${this.summonerStatsUrl}/${accountID}`).pipe(catchError(_ => of(null)))
  }

}
