import { Injectable, HttpService, NotFoundException } from '@nestjs/common';
import { map, catchError, switchMap, concatMap, flatMap, mergeMap, combineLatest } from 'rxjs/operators';
import { SummonerProfile } from '../../lib/models/SummonerProfile-model';
import { SummonerStats } from '../../lib/models/SummonerStats.model';
import { MatchHistoryList } from '../../lib/models/Match/MatchHistoryList.model';
import { of, forkJoin, Observable }  from 'rxjs';
import { MatchInfo } from '../../lib/models/Match/MatchInfo.model';


@Injectable()
export class SummonerQueryService {

    public summonerProfileAPI = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name';
    public summonerStatsAPI = 'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner';
    public matchInfoAPI = 'https://euw1.api.riotgames.com/lol/match/v4/matches';
    public matchHistoryAPI = 'https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account';
    private APIKey = 'RGAPI-80ef464b-690e-4942-ad77-100a2db44ff0'

    constructor(private http: HttpService) {  }

    getSummonerProfile(name: string) {
        return this.http.get<SummonerProfile>(`${this.summonerProfileAPI}/${name}`, {
            headers: {
              'X-Riot-Token': this.APIKey
            }
        }).pipe(
            catchError(_ => {throw new NotFoundException}),
            map(res => res.data)
        );
    }

    getSummonerStats(id: string) {
        return this.http.get<SummonerStats>(`${this.summonerStatsAPI}/${id}`, {
            headers: {
              'X-Riot-Token': this.APIKey
            }
        }).pipe(
            catchError(_ => {throw new NotFoundException}),
            map(res => res.data[0])
        );
    }

    getAllMatchesByUID(accountID: string): Observable<Array<MatchInfo>> {
        return this.http.get<MatchHistoryList>(`${this.matchHistoryAPI}/${accountID}`, {
            headers: {
              'X-Riot-Token': this.APIKey
            }
        }).pipe(
            catchError(_ => {throw new NotFoundException}),
            map(res => res.data.matches),
            map(res => res.slice(0, 10)),
            switchMap(matches => {
                return forkJoin(
                    matches.map(match => {
                        return this.getMatchInfo(match.gameId);
                    })
                )
            })
        );
    }

    getMatchInfo(matchID: number) {
        return this.http.get<MatchInfo>(`${this.matchInfoAPI}/${matchID}`, {
            headers: {
              'X-Riot-Token': this.APIKey
            }
        }).pipe(
          catchError(_ => {throw new NotFoundException}),  
          map(res => res.data)
        );
    }
}