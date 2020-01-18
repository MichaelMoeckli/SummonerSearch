import { Component, OnInit } from '@angular/core';
import { DataService } from '../config/data.service';
import { ProfileService } from '../config/profile.service';
import { MatchHistory } from 'server/lib/models/Match/MatchHistory.model';
import { SummonerProfile } from 'server/lib/models/SummonerProfile-model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SummonerStats } from 'server/lib/models/SummonerStats.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Param } from '@nestjs/common';

@Component({
  selector: 'app-summoner-profile',
  templateUrl: './summoner-profile.component.html',
  styleUrls: ['./summoner-profile.component.scss']
})
export class SummonerProfileComponent implements OnInit {

  summonerProfile: Observable<SummonerProfile>;
  matchHistory: Observable<MatchHistory>;
  summonerStats: Observable<SummonerStats>;

  constructor(public data: DataService, public profileService: ProfileService, public _router: Router, public _routhandler:ActivatedRoute) { }

  ngOnInit() {

    this._routhandler.params.subscribe(param => {
      this.summonerProfile = this.data.getSummonerName(param.id)
      this.matchHistory = this.summonerProfile.pipe(switchMap(summoner => this.data.getMatchHistory(summoner.accountId)));
      this.summonerStats = this.summonerProfile.pipe(switchMap(summoner => this.data.getSummonerStats(summoner.id)));
    })
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
