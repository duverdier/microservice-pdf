import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import * as models from '../queries/models';

dotenv.config();

export const SequelizeProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const config = {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        dialect: 'postgres',
        // synchronize: false
      } as SequelizeOptions;

      const sequelize = new Sequelize(config);
      sequelize.addModels(Object.values(models));
      await sequelize.sync();
      return sequelize;
    },
  },
];
