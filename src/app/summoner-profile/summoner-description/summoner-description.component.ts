import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProfileService } from 'src/app/config/profile.service';
import { SummonerProfile } from 'server/lib/models/SummonerProfile-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-summoner-description',
  templateUrl: './summoner-description.component.html',
  styleUrls: ['./summoner-description.component.scss']
})
export class SummonerDescriptionComponent implements OnInit {

  @Input() summonerProfile: Observable<SummonerProfile>



  iconURL: string;
  summonerName: string;

  constructor() {
  }

  ngOnInit() {
    this.summonerProfile.subscribe(summoner => {
      this.summonerName = summoner.name
      this.iconURL = `assets/data/profileicon/${summoner.profileIconId}.png`
    });
  }

}