import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummonerSearchComponent } from './summoner-search/summoner-search.component';
import { SummonerProfileComponent } from './summoner-profile/summoner-profile.component';
import { WindowsDefenderGuard } from './guards/windows-defender.guard';


const routes: Routes = [ 
  { path: '', component: SummonerSearchComponent },
  { path: 'profile', canActivate: [WindowsDefenderGuard], component: SummonerProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
