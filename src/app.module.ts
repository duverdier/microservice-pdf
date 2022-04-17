import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as controllers from './controller';
import * as services from './service';
import * as repositories from './repositories';
import { dbProviders } from './queries/providers';
import { SequelizeModule } from './database/sequelize.module';

@Module({
  imports: [
    SequelizeModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [...Object.values(controllers)],
  providers: [
    ...Object.values(services),
    ...Object.values(repositories),
    ...dbProviders,
  ],
})
export class AppModule {}
