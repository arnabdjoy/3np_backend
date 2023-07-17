import { Module } from "@nestjs/common";
import { FacultyController } from "./faculty.controller";
import { FacultyService } from "./faculty.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FacultyEntity } from "./faculty.entity";
import { StudentEntity } from "src/Student/student.entity";
import { PublicationEntity } from "src/publication/publication.entity";
import { MailerModule } from "@nestjs-modules/mailer/dist";



@Module({

  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        auth: {
          user: 'arnab.d.joy@gmail.com',
          pass: ' nicnsskhkbwtbplr  ',
        },
      },
      defaults: {
        from: '"arnab" <  >',
      },
     
    }), TypeOrmModule.forFeature([FacultyEntity, StudentEntity, PublicationEntity]),],
    controllers: [FacultyController],
    providers: [FacultyService],
  })
  export class FacultyModule {}
  