import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

export interface summonerProfile{
    profileIconId: number;
    name: string;
    puuid: string;
    summonerLevel: number;
    accountId: number;
    id: string;
}

@Injectable()
export class SummonerQueryService {
    
    public summonerNameAPI = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name";

    constructor(private http: HttpService) {  }

    GetSummoner(name: string) {
        return this.http.get<summonerProfile>(`${this.summonerNameAPI}/${name}`, {
            headers: {
             "Access-Control-Allow-Origin": "*",
              "X-Riot-Token": "RGAPI-ec9f176d-3475-4dea-a590-5cd571d76e5d",
            }
        }).pipe(
            map(res => res.data)
        );
    }

}