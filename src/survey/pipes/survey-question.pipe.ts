import { BadRequestException, Logger, PipeTransform } from "@nestjs/common";
import { isArray } from "class-validator";

export class SurveyQuestionPipe implements PipeTransform {

    private logger = new Logger('SruveyQuestionPipe');

    transform(value: any){
        const question = value.question

        if(question < 0 && question > 6){
            this.logger.error(`questionn 범위를 벗어났습니다.`)
            throw new BadRequestException('잘못된 질문을 답변하셧습니다.');
        }


        const selected = (question !== 4)? this.isSelectArray(value.selected) : this.isMatterArray(value.selected);

        const body = {
            question,
            selected
        }

        return body;
    }

    private isSelectArray(select: any){
        if(isArray(select)){
            return select[0]
        }

        return select;
    }

    private isMatterArray(select: any) {
        if(isArray(select)){
            return select;
        }

        const array = [select]

        return array;
    }
}