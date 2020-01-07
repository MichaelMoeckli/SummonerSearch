import { Component, OnInit } from '@angular/core';
import { DataService } from '../config/data.service';
import { ProfileService } from '../config/profile.service';
import { MatchHistory } from 'server/lib/models/Match/MatchHistory.model';
import { SummonerProfile } from 'server/lib/models/SummonerProfile-model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-summoner-profile',
  templateUrl: './summoner-profile.component.html',
  styleUrls: ['./summoner-profile.component.scss']
})
export class SummonerProfileComponent implements OnInit {

  summonerProfile: Observable<SummonerProfile>;
  matchHistory: Observable<MatchHistory>;

  constructor(public data: DataService, public profileService: ProfileService) { }

  async ngOnInit() {
    this.summonerProfile = this.data.getSummonerName('Beni8409')
    this.matchHistory = this.data.getSummonerName('Beni8409').pipe(switchMap(summoner => this.data.getMatchHistory(summoner.accountId)));
    // this.summonerProfile = await this.data.getSummonerName('Beni8409').toPromise()
    // this.matches = await this.data.getMatchHistory(this.summonerProfile.accountId).toPromise();
    // console.log(this.summonerProfile.name)
    //  this.data.getSummonerName('SchwiftyMigi').subscribe(summoner => {this.profileService.setProfile(summoner)
    //   this.summonerProfile = summoner;
    //   this.data.getMatchHistory(this.profileService.profile.accountId).subscribe(matches => {
    //     this.matches = matches;
    //     // this.profileService.setMatchHistory(matches)
    //   });
    // })
  }

}
