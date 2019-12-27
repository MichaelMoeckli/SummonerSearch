import { Module, HttpModule } from '@nestjs/common';
import { SummonerQueryService } from './summoner-query.service';
import { SummonerQueryController } from './summoner-query.controller';


@Module({
  imports: [HttpModule],
  controllers: 
    [SummonerQueryController],
  providers: 
    [SummonerQueryService]
})
export class SummonerQueryModule {}
