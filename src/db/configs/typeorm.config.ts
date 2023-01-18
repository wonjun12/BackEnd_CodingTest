import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0000',
    database: 'survey-travel',
    entities: [__dirname + '/../entity/*.{js, ts}'],
    synchronize: true
}