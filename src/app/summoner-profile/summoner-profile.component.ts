import { Component, OnInit } from '@angular/core';
import { DataService } from '../config/data.service';
import { ProfileService } from '../config/profile.service';
import { MatchHistory } from 'server/lib/models/Match/MatchHistory.model';

@Component({
  selector: 'app-summoner-profile',
  templateUrl: './summoner-profile.component.html',
  styleUrls: ['./summoner-profile.component.scss']
})
export class SummonerProfileComponent implements OnInit {

  summonerMatches: MatchHistory;

  constructor(public data: DataService, public profileService: ProfileService) { }

  ngOnInit() {
    this.data.getMatchHistory(this.profileService.profile.accountId).subscribe(matches => {
      this.summonerMatches = matches;
      matches[0]
    })
  }

}
