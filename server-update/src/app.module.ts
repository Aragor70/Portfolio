import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';
import { ContactModule } from './contact/contact.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.PSQL_USERNAME,
      password: process.env.PSQL_PASSWORD,
      database: process.env.PSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProjectModule,
    ExperienceModule,
    EducationModule,
    ContactModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
