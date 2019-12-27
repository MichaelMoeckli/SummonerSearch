import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { SummonerQueryModule } from './src/summoner-query/summoner-query.module';


@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true
    }), SummonerQueryModule
  ]
})
export class ApplicationModule {}
