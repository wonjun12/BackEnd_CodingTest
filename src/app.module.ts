import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './db/configs/typeorm.config';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    SurveyModule 
  ],
})
export class AppModule {}
