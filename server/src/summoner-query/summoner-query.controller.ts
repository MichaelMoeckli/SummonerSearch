import { Controller, Get, Param } from '@nestjs/common';
import { SummonerQueryService } from './summoner-query.service';

@Controller('')
export class SummonerQueryController {

    constructor(private queryService: SummonerQueryService) {  }

    @Get('getsummoner/:name')
    GetSummenorByName(@Param('name')name: string) {
        return this.queryService.GetSummoner(name);
    }

}