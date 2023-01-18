import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

const SETTING = {
    default: -1,
    nullable: true
}

@Entity()
export class Survey extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(SETTING)
    planning: number;

    @Column(SETTING)
    variety: number;

    @Column(SETTING)
    destination: number;

    @Column(SETTING)
    amount: number;

    @Column('int', {
        array: true,
        default: [],
        nullable: true
    })
    matters: number[];

    @Column(SETTING)
    preference: number;

    @Column(SETTING)
    gender: number;

    @Column({
        default: 0
    })
    totalCount: number;
    
}