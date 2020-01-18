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
    private APIKey = 'RGAPI-ca388c00-327b-4b1f-8a27-e78f701bc30e'
    private APIKey2 = 'RGAPI-e7298766-b06c-47f6-8c6d-f3ee5bc967e8'

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
        return this.http.get<SummonerStats | boolean>(`${this.summonerStatsAPI}/${id}`, {
            headers: {
              'X-Riot-Token': this.APIKey
            }
        }).pipe(
            catchError(_ => {throw new NotFoundException}),
            map(res => res.data),
            map(res => {if (res == false)return null; return res[0]})
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
              'X-Riot-Token': this.APIKey2
            }
        }).pipe(
          catchError(_ => {throw new NotFoundException}),  
          map(res => res.data)
        );
    }
}