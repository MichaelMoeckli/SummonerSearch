import { Injectable } from '@angular/core';
import { SummonerProfile } from 'server/lib/models/SummonerProfile-model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profile: SummonerProfile

  constructor() { }

  setProfile(profile: SummonerProfile) {
    this.profile = profile;
  }

  get getProfile() {
    return this.profile;
  }

}
