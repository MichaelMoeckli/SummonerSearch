import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProfileService } from 'src/app/config/profile.service';
import { SummonerProfile } from 'server/lib/models/SummonerProfile-model';
import { Observable } from 'rxjs';
import { SummonerStats } from 'server/lib/models/SummonerStats.model';

@Component({
  selector: 'app-summoner-description',
  templateUrl: './summoner-description.component.html',
  styleUrls: ['./summoner-description.component.scss']
})
export class SummonerDescriptionComponent implements OnInit {

  @Input() summonerProfile: Observable<SummonerProfile>
  @Input('summonerStats') stats: Observable <SummonerStats>

  summonerID: string;
  summonerTier: string;
  summonerRank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  rankURL: string;
  winrate: number;
  iconURL: string;
  summonerName: string;

  constructor() {
  }

  ngOnInit() {
    this.summonerProfile.subscribe(summoner => {
      this.summonerName = summoner.name
      this.iconURL = `assets/data/profileicon/${summoner.profileIconId}.png`

      //rank
      this.summonerProfile.subscribe(summoner =>{
        this.summonerID = summoner.id
        
      })
      this.stats.subscribe(stats => {
        
        if(stats == null){
          this.summonerTier = "unranked"
          this.summonerRank = ""
          this.leaguePoints = 0
          this.wins = 0
          this.losses = 0
          this.winrate = 0
        }else{
        this.summonerTier = stats.tier
        this.summonerRank = stats.rank
        this.leaguePoints = stats.leaguePoints
        this.wins = stats.wins
        this.losses = stats.losses 
        this.winrate = (this.wins/(this.wins+this.losses))*100  
        }
        this.rankURL = `assets/data/ranks/${this.summonerTier}.png`
      })
    });
  }

}