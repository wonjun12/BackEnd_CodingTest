import { SurveyQuestionPipe } from './pipes/survey-question.pipe';
import { SurveyService } from './survey.service';
import { Controller, Get, Post, Param, Delete, Patch, Body, UsePipes } from '@nestjs/common';
import { Survey } from 'src/db/entity/survey';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { Logger } from '@nestjs/common';

@Controller('survey')
export class SurveyController {
    constructor(private surveyService: SurveyService) { }


    private logger = new Logger('SurveyController');

    //설문지 생성
    @Get(':id')
    async createSurvey(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Survey> {
        this.logger.verbose(`${id} 아이디로 설문지를 생성 하려 합니다.`);
        return this.surveyService.createSurvey(id);
    }

    //설문지 삭제
    @Delete(':id')
    deleteSurvey(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        this.logger.verbose(`${id} 아이디로 설문지를 삭제 하려 합니다.`);
        return this.surveyService.deleteSurvey(id);
    }

    //설문지 완료 
    @Post(':id/complete')
    completeSurvey(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Survey> {
        this.logger.verbose(`${id} 아이디로 설문지를 완료 하려 합니다.`)
        return this.surveyService.completeSurvey(id);
    }

    //완료된 설문지 확인
    @Get(':id/complete')
    getCompleteSurvey(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Survey> {
        this.logger.verbose(`${id} 아이디로 완료된 설문지를 확인하려 합니다.`)
        return this.surveyService.getCompleteSurvey(id);
    }

    //특정 질문을 선택했을때
    @Post(':id/select')
    async updateSurveyQuestion(
        @Param('id', ParseIntPipe) id: number,
        //질문의 종류와 선택지 유효성 검사
        @Body(SurveyQuestionPipe) Question: any,
    ): Promise<Survey> {
        this.logger.verbose(`${(Question.question + 1)}번째 질문의 답 ${Question.selected} 를 받았습니다. `)
        return this.surveyService.updateSurveyQuestion(id, Question);
    }

}
