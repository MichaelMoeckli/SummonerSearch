import { Injectable } from '@angular/core';
import { SummonerProfile } from 'server/lib/models/SummonerProfile-model';
import { MatchHistory } from 'server/lib/models/Match/MatchHistory.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profile: SummonerProfile;
  matchHistory: MatchHistory;


  constructor() { }

  setProfile(profile: SummonerProfile) {
    this.profile = profile;
  }

  setMatchHistory(matchHistory: MatchHistory) {
    this.matchHistory = matchHistory;
  }

  get getMatchHistory() {
    return this.matchHistory;
  }

  get getProfile() {
    return this.profile;
  }

}
