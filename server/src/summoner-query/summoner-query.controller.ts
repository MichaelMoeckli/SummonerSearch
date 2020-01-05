import { Controller, Get, Param } from '@nestjs/common';
import { SummonerQueryService } from './summoner-query.service';

@Controller('summoner')
export class SummonerQueryController {

    constructor(private queryService: SummonerQueryService) {  }

    @Get('profile/:name')
    GetSummenorByName(@Param('name')name: string) {
        return this.queryService.getSummonerProfile(name);
    }

    @Get('stats/:id')
    GetStatsByUID(@Param('id')id: string) {
        return this.queryService.getSummonerStats(id);
    }

    @Get('matches/:accountID')
    GetAllMatchesByUID(@Param('accountID')accountID: string) {
        return this.queryService.getAllMatchesByUID(accountID);
    }
    
    @Get('match/:matchID')
    GetMatchByID(@Param('matchID')matchID: number) {
        return this.queryService.getMatchInfo(matchID);
    }
}