import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { SummonerSearchComponent } from './summoner-search/summoner-search.component';
import { SummonerProfileComponent } from './summoner-profile/summoner-profile.component';
import { SummonerDescriptionComponent } from './summoner-profile/summoner-description/summoner-description.component';
import { SummonerRankComponent } from './summoner-profile/summoner-rank/summoner-rank.component';
import { ChampionMasteryComponent } from './summoner-profile/champion-mastery/champion-mastery.component';
import { MatchHistoryComponent } from './summoner-profile/match-history/match-history.component';
import { MatchComponent } from './summoner-profile/match-history/match/match.component';


@NgModule({
  declarations: [
    AppComponent,
    SummonerSearchComponent,
    SummonerProfileComponent,
    SummonerDescriptionComponent,
    SummonerRankComponent,
    ChampionMasteryComponent,
    MatchHistoryComponent,
    MatchComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
