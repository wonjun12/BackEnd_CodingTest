import { SurveyRepository } from './survey.repository';
import { TypeOrmExModule } from './../db/custom-repository/typeorm.module';
import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([SurveyRepository])
  ],
  controllers: [SurveyController],
  providers: [SurveyService]
})
export class SurveyModule {}
