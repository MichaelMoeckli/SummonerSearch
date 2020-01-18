import { Component, OnInit, Input } from '@angular/core';
import { gamemode } from '../match-history.gamemode.model';
import { MatchInfo } from 'server/lib/models/Match/MatchInfo.model';
import { SummonerProfile } from 'server/lib/models/SummonerProfile-model';
import { Participant } from 'server/lib/models/Match/Participant.model';
import * as championMap from "../../../../assets/data/champion.json";
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { ParticipantIdentity } from 'server/lib/models/Match/ParticipantIdentity.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() match: MatchInfo 
  @Input() summonerProfile: SummonerProfile
  @Input() participant: Participant

  gameMode: string;
  duration: number;
  creation: string;
  summonerID: number;
  win: boolean;
  championId: number;
  championUrl: string;
  team1: ParticipantIdentity[]
  team2: ParticipantIdentity[]

  constructor() { }

  ngOnInit() {
    this.gameMode = gamemode.filter(e => e.queueId == this.match.queueId)[0].description
    this.duration = Math.round(this.match.gameDuration / 60)

    //Game creation date 
    let stringCreation  = this.match.gameCreation.toString().substr(0,10)
    var creationDate = new Date(parseInt(stringCreation)* 1000)
    var date2 = new Date(); 
    let creationHours = Math.round((date2.getTime() - creationDate.getTime() )/ (1000 * 3600))
    if(creationHours <= 24)
      this.creation = creationHours.toString() + " hours ago"
    else
      this.creation = Math.round((date2.getTime() - creationDate.getTime() )/ (1000 * 3600 * 24)).toString() + " days ago"

    this.summonerID = this.match.participantIdentities.filter(e => e.player.summonerName == this.summonerProfile.name)[0].participantId
    this.win = this.match.participants.some(e => e.stats.win == true && e.participantId == this.summonerID)
    this.championId = this.match.participants.filter(e => e.participantId == this.summonerID)[0].championId
    let championName = Object.values(championMap.data).filter(e => e.key==this.championId.toString())[0].name 
    championName = championName.replace(" ","")
    this.championUrl = `assets/data/tiles/${championName.replace("'","")}_0.jpg`

    this.team1= this.match.participantIdentities.slice(0,5)
    this.team2= this.match.participantIdentities.slice(5)

  }

}
