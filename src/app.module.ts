import { Module } from '@nestjs/common';
import { FacultyModule } from './Faculty/faculty.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer/dist';

@Module({

  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        auth: {
          user: 'arnab.d.joy@gmail.com',
          pass: '  nicnsskhkbwtbplr ',
        },
      },

      defaults: {
        from: '"arnab" <  >',
      },
    }), FacultyModule, TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12344321',
    database: '3np_backend',//Change to your database name
    autoLoadEntities: true,
    synchronize: true,
    } ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
