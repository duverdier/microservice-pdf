import { Module } from '@nestjs/common';
import { SequelizeProviders } from './sequelize.providers';

@Module({
  providers: [...SequelizeProviders],
  exports: [...SequelizeProviders],
})
export class SequelizeModule {}
