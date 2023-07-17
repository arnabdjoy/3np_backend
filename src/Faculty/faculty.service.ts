import { Injectable } from "@nestjs/common";
import { FacultyDTO, FacultyLoginDTO, FacultyUpdateDTO, NoticeDTO, NoticeUpdateDTO, PublicationDTO, PublicationUpdateDTO, StudentDTO } from "./faculty.dto";
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { FacultyEntity } from "./faculty.entity";
import { StudentEntity } from "src/Student/student.entity";
import {StudentUpdateDTO } from "src/Student/student.dto";
import { PublicationEntity } from "src/publication/publication.entity";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class FacultyService {

  constructor(
  @InjectRepository(FacultyEntity)
  private facultyRepo: Repository<FacultyEntity>,

  private readonly mailerService: MailerService,
  
  @InjectRepository(StudentEntity)
  private studentRepo: Repository<StudentEntity>,

  @InjectRepository(PublicationEntity)
  private publicationRepo: Repository<PublicationEntity>

  
) { }
async getIndex(): Promise<FacultyEntity[]> {
  return this.facultyRepo.find();
}
async getStudentById(id: number): Promise<StudentEntity> {
  return this.studentRepo.findOneBy({ id });
}

async addStudent(data: StudentDTO): Promise<StudentEntity> {
  return this.studentRepo.save(data);
}

async updateStudent(
id: number,
updatedStudent: Partial<StudentEntity>
): Promise<StudentEntity> {
await this.studentRepo.update({ id }, updatedStudent);
return this.studentRepo.findOneBy({ id });
}



async deleteStudent(id: number): Promise<string> {

  await this.studentRepo.delete(id);

  return "Student deleted successfully";

}

async getAllStudents(): Promise<StudentEntity[]> {
  return this.studentRepo.find();
}
async getStudentsByFaculty (facultyid: number): Promise<FacultyEntity[]> {
  return this.facultyRepo.find({
      where: { id: facultyid },
      relations: {
          students: true,
      },
  });
}


async createPublication(FacultyData: Partial<FacultyEntity>, PublicationData: Partial<PublicationEntity>): Promise<FacultyEntity> {

  const publication = this.publicationRepo.create(PublicationData);

  const faculty = this.facultyRepo.create({

    ...FacultyData,

    publications: [publication],

  });

  await this.publicationRepo.save(publication);
  return this.facultyRepo.save(faculty);

}


async getPubDetailsById(id: number): Promise<PublicationEntity> {
  return this.publicationRepo.findOneBy({id});
}


async updatePubDetails(
  id: number,
  updatedPubDetails: Partial<PublicationEntity>
): Promise<PublicationEntity> {
  await this.publicationRepo.update({ id }, updatedPubDetails);
  return this.publicationRepo.findOneBy({ id });
}
async signup(data: FacultyDTO): Promise<FacultyEntity> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const faculty = this.facultyRepo.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
    image: data.image,
  });

  return this.facultyRepo.save(faculty);
}

async signIn(data: FacultyLoginDTO) {
  const userdata = await this.facultyRepo.findOneBy({ email: data.email });

  if (!userdata) {
    // Handle the case when the user data is not found.
    return false;
  }

  const match = await bcrypt.compare(data.password, userdata.password);
  return match;
}

async sendEmail(subject: string, recipient: string, content: string): Promise<void> {
  try{
  
  await this.mailerService.sendMail({
  to: recipient,
  subject,
  text: content,
  });
  }
  catch(error){
  throw error;
  }
  }

}


















  /*getHello(): string {
    return 'Hello Students!';
  }

  getUser(): string {
    return 'Hello User!';
  }

  getClass(): string {
    return 'Hello Class!';
  }

  getAWT(): string {
    return 'Welcome to AWT!';
  }

  addStudent(data: FacultyDTO):string{
    return data.email;
  }

  addNotice(data: NoticeDTO):any{
    console.log (data.date);
    console.log (data.text);
    return data;
  }

  addPublication(data: PublicationDTO):any{
    console.log(data.id);
    console.log (data.date);
    console.log (data.text);
    return data;
  }

  updateFaculty(data: FacultyUpdateDTO): object
    {
console.log(data.id);
console.log(data.name);
console.log(data.email);
console.log(data.password);
        return data;
    }

    updateNotice(data: NoticeUpdateDTO): object
    {
console.log(data.text);
        return data;
}

updatePublication(data: PublicationUpdateDTO): object
    {
console.log(data.text);
        return data;
}

getStudentById(id: number): any{
   if (id==1){
    return ({id: 1, name: "jiku", email:"ab@gmail.edu"});
  }
  else if (id==2){
    return ({id: 2, name: "bittu", email:"bt@gmail.edu"});
  }
  else if (id==3){
    return ({id: 3, name: "pappu", email:"pt@gmail.edu"});
}
else {
  return("ERROR!!!!!!")
}
}*/


