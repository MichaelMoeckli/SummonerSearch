import { Component, OnInit } from '@angular/core';
import { DataService } from '../config/data.service';
import { SummonerProfile } from '../../../server/lib/models/SummonerProfile-model';
import { FormControlService, FormErrorStateMatcher } from '../config/form-control.service';
import { FormControl } from '@angular/forms';
import { ProfileService } from '../config/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summoner-search',
  templateUrl: './summoner-search.component.html',
  styleUrls: ['./summoner-search.component.scss']
})
export class SummonerSearchComponent implements OnInit {


  public summonerInput: FormControl;
  public matcher: FormErrorStateMatcher;

  constructor(public data:DataService, public formControlService: FormControlService, public profileService: ProfileService, public router: Router) {  }

  ngOnInit() {
    this.summonerInput = this.formControlService.createRequired();
    this.matcher = this.formControlService.matcher;
  }

  getSummoner(){
    this.data.getSummonerName(this.summonerInput.value).subscribe((res: SummonerProfile) => {
      if(res != null) {
        this.summonerInput.setErrors(null);
        this.profileService.setProfile(res);
        this.router.navigate(['profile']);
      } else {
        this.summonerInput.setErrors({'incorrect': true});
      }
    });
  }

}