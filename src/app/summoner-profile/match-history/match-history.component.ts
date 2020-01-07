import { Component, OnInit, Input } from '@angular/core';
import { SummonerProfile } from 'server/lib/models/SummonerProfile-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchHistory } from 'server/lib/models/Match/MatchHistory.model';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss']
})
export class MatchHistoryComponent implements OnInit {

  @Input() matchHistory: Observable<MatchHistory>;

  constructor() {
    // this.Summ.subscribe(e => {e.name})
   }

  ngOnInit() {
  }

}
