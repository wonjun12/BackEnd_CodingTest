import { SurveyRepository } from './survey.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/db/entity/survey';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class SurveyService {
    private logger = new Logger('SurveyService');

    constructor(
        @InjectRepository(SurveyRepository)
        private surveyRepository: SurveyRepository,
    ) { }

    //설문지 검색
    async getSurveyById(id: number): Promise<Survey> {
        const survey = await this.surveyRepository.findOneBy({
            id
        })

        if (!survey) {
            this.logger.log(`${id} 아이디가 존재하지 않음`)
            throw new NotFoundException('해당 설문지를 찾을 수 없습니다.');
        }

        return survey;
    }

    //설문지 만들기
    async createSurvey(id: number): Promise<Survey> {

        //설문지를 검색
        const survey = await this.surveyRepository.findOneBy({
            id
        })

        //없다면 새로 만든다.
        if (!survey) {
            return this.surveyRepository.createSurvey(id);
        }

        return survey;
    }

    //설문지 완료 
    async completeSurvey(id: number): Promise<Survey> {

        const survey = await this.getSurveyById(id);

        return this.surveyRepository.completeSurvey(survey);
    }

    //설문지 삭제
    async deleteSurvey(id: number): Promise<void> {
        const result = await this.surveyRepository.delete(id);

        if (result.affected === 0) {
            this.logger.log(`${id} 찾을 수 없어 삭제할수 없습니다.`)
            throw new NotFoundException('해당 질문지를 찾을 수 없습니다.');
        }
    }


    //완료된 설문지 가져오기
    async getCompleteSurvey(id: number): Promise<Survey> {

        const survey = await this.getSurveyById(id)

        try {
            this.surveyRepository.IsSurveyQuestionVaild(survey);    
        } catch (error) {
            this.logger.warn(`${id} 완료된 설문지의 유효성 검사 오류가 발생했습니다.`)
        }
        

        return survey;
    }



    //문항 선택시 실행
    async updateSurveyQuestion(id: number, Question: any): Promise<Survey> {

        const { question, selected } = Question;

        const survey = await this.getSurveyById(id);

        //문항 선택 실행
        return this.surveyRepository.updateSurveyQuestion(survey, question, selected);
    }


}