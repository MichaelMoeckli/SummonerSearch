import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../config/data.service';

@Component({
  selector: 'app-summoner-search',
  templateUrl: './summoner-search.component.html',
  styleUrls: ['./summoner-search.component.css']
})
export class SummonerSearchComponent implements OnInit {

  public summonerInput: string;

  constructor(public data:DataService) {

  }

  ngOnInit() {
  }

  getSummoner(){
    this.data.getSummonerName(this.summonerInput).subscribe(res=>{console.log(res)})
    //this.data.getSummonerName(this.summonerInput).subscribe(function(res){console.log(res)})
  }

}