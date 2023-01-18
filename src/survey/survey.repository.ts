import { isArray } from 'class-validator';
import { BadRequestException, Logger } from '@nestjs/common';
import { Survey } from './../db/entity/survey';
import { CustomRepository } from "src/db/custom-repository/typeorm.decorator";
import { Repository } from 'typeorm';

@CustomRepository(Survey)
export class SurveyRepository extends Repository<Survey> {

    private logger = new Logger('SurveyRepository')

    //설문지 만들기
    async createSurvey(id: number): Promise<Survey> {

        const survey = this.create({
            id
        });

        try {
            await this.save(survey);    
        } catch (error) {
            this.logger.error('설문지 만드는데 있어 오류가 발생했습니다.')
            this.logger.error(error);
        }
        
        return survey;
    }

    //설문지 완료
    async completeSurvey(survey: Survey): Promise<Survey> {

        const { planning, variety, destination, amount, preference, gender, matters } = survey;

        await this.IsSurveyQuestionVaild(survey);

        //여행을 간다 응답 했을때
        if (!planning) {
            survey.totalCount = planning + variety + destination + amount
                + preference + gender

            for (let i of matters) {
                survey.totalCount += i;
            }
        } else {
            survey.totalCount = planning + gender;
        }

        try {
            await this.save(survey);
        } catch (error) {
            this.logger.error('설문지 완료 하는데 있어 오류가 발생했습니다.');
            this.logger.error(error);
        }

        return survey
    }

    //항목 선택 시 => 수정
    async updateSurveyQuestion(survey: Survey, question: number, selected: any): Promise<Survey> {

        const QuestionOption = [
            'planning',
            'variety',
            'destination',
            'amount',
            'matters',
            'preference',
            'gender'
        ]

        const found = QuestionOption[question];

        this.ErrorSurveyMessage(survey[found]);

        if (question === 0) {
            survey = this.UpdatePlanning(survey, selected);
        } else {
            survey = this.UpdateQuestion(survey, found, selected);
        }

        survey.totalCount = 0;

        try {
            await this.save(survey);
        } catch (error) {
            this.logger.error('문항 선택 시 DB에 저장할때 오류가 발생했습니다.')
            this.logger.error(error)
        }
        

        return survey;
    }


    //선택에 따른 에러구분
    private ErrorSurveyMessage(question: number[]) {
        if (question === null) {
            throw new BadRequestException('여행을 가지 않는다고 선택하셨기 때문에 선택할수 없습니다.')
        }
    }


    //첫번째 질문의 응답에 따라 나머지 질문 참/불 수정
    private UpdatePlanning(survey: Survey, selected: number) {
        survey.planning = selected;

        //첫번째 질문에 예/아니요 응답에 따른 미응답/답변불가 설정
        survey.variety = (!selected) ? -1 : null;
        survey.destination = (!selected) ? -1 : null;
        survey.amount = (!selected) ? -1 : null;
        survey.matters = (!selected) ? [] : null;
        survey.preference = (!selected) ? -1 : null;

        return survey;
    }

    //응답 문항 선택
    private UpdateQuestion(survey: Survey, found: string, selected: any) {

        survey[found] = selected;

        return survey;
    }


    //미응답 및 선택 불가 에러 함수
    public IsSurveyQuestionVaild(survey: Survey) {
        try {

            if (
                !(0 <= survey.planning && survey.planning < 2) ||
                !(survey.variety === null || (0 <= survey.variety && survey.variety < 3)) ||
                !(survey.destination === null || (0 <= survey.destination && survey.destination < 6)) ||
                !(survey.amount === null || (0 <= survey.amount && survey.amount < 5)) ||
                !(survey.matters === null || 0 <= survey.matters.length) ||
                !(survey.preference === null || (0 <= survey.preference && survey.preference < 5)) ||
                !(0 <= survey.gender && survey.gender < 2)
            ) {
                throw new BadRequestException('잘못된 항목을 선택 하셨거나 미응답한 항목이 존재 합니다.');
            } else if (survey.matters !== null) {
                for (let i of survey.matters) {
                    if (!(0 <= i && i < 6)) {
                        throw new BadRequestException('잘못된 항목을 선택 하셨거나 미응답한 항목이 존재 합니다.');
                    }
                }
            }

        } catch (error) {
            this.logger.error('미응답 및 선택불가에 대한 에러 출력에서 오류가 발생했습니다.');
            this.logger.error(error);
        }
        
    }
}