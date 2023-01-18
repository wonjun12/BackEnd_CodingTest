import { Max, IsNumber, Min, IsOptional } from "class-validator";

export class UpdateSurveyDto {

    @IsNumber()
    @Min(-1)
    @Max(1)
    planning?: number;

    @IsNumber()
    @Min(-1)
    @Max(2)
    variety?: number;

    @IsNumber()
    @Min(-1)
    @Max(5)
    destination?: number;

    @IsNumber()
    @Min(-1)
    @Max(4)
    amount?: number;

    @IsNumber()
    matters?: number[];

    @IsNumber()
    @Min(-1)
    @Max(4)
    preference?: number;

    @IsNumber()
    @Min(-1)
    @Max(1)
    gender?: number;
}