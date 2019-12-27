import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, pipe, Observable } from 'rxjs';
import { map} from 'rxjs/operators';

interface summonerProfile{
  profileIconId: number;
  name: string;
  puuid: string;
  summonerLevel: number;
  accountId: number;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
//überall ansprechen
export class DataService {

  public summonerNameAPI = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name";

  public summonderName: Observable<any>

  constructor(private http: HttpClient) { 
    
  }

  public getSummonerName(name: string):Observable<summonerProfile>{ 
      return this.http.get<summonerProfile>(`${this.summonerNameAPI}/${name}`, {
       headers: {
        "Access-Control-Allow-Origin": "*",
      //"Origin": "https://developer.riotgames.com/",
       //  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
         "X-Riot-Token": "RGAPI-42c1f679-1022-44c7-af06-38b88af52505",
       //  "Accept-Language": "en-US,en;q=0.9",
       //  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36"
       }
      })
  }

}
