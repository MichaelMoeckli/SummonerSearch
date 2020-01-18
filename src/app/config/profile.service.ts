import { Injectable } from '@angular/core';
import { SummonerProfile } from 'server/lib/models/SummonerProfile-model';
import { MatchHistory } from 'server/lib/models/Match/MatchHistory.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public SearchIsValid: boolean

}
