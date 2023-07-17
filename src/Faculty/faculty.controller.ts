import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FacultyDTO, FacultyLoginDTO, FacultyUpdateDTO, NoticeDTO, NoticeUpdateDTO, PublicationDTO, PublicationUpdateDTO, StudentDTO } from "./faculty.dto";
import { FacultyService } from "./faculty.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { StudentUpdateDTO } from "src/Student/student.dto";
import { StudentEntity } from "src/Student/student.entity";
import { FacultyEntity } from "./faculty.entity";
import { PublicationEntity } from "src/publication/publication.entity";
import { SessionGuard } from "./session.guard";



/*@Get('/profile')
getClass(): string {
  return this.facultyservice.getClass();
}

@Post('/add')
@UsePipes(new ValidationPipe())
addStudent (@Body() data:StudentDTO):string {
  console.log(data);
  return this.facultyservice.addStudent(data);;
}

@Post('/addnotice')
@UsePipes(new ValidationPipe())
addNotice (@Body() data:NoticeDTO):any {
  console.log(data);
  return this.facultyservice.addNotice(data);;
}

@Post('/addpubdetails')
@UsePipes(new ValidationPipe())
addPublication (@Body() data:PublicationDTO):any {
  console.log(data);
  return this.facultyservice.addPublication(data);;
}

@Put('/updatefaculty')
//@UsePipes(new ValidationPipe())
updateFaculty(@Body() data:FacultyUpdateDTO): object{
    return this.facultyservice.updateFaculty(data);
}

@Put('/updatenotice')
//@UsePipes(new ValidationPipe())
updateNotice(@Body() data:NoticeUpdateDTO): object{
    return this.facultyservice.updateNotice(data);
}

@Put('/updatepubdetails')
//@UsePipes(new ValidationPipe())
updatePublication(@Body() data:PublicationUpdateDTO): object{
    return this.facultyservice.updatePublication(data);
}

@Post(('/upload'))
@UseInterceptors(FileInterceptor('myfile',
{ fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf|docx|pptx|xlsx)$/))
     cb(null, true);
    else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    },
    limits: { fileSize: 10 * 1024 * 1024 },
    storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
    },
    })
    }
))
uploadFile(@UploadedFile() myfileobj: Express.Multer.File):object
{
 console.log(myfileobj)   
return ({message:"file uploaded"});
}

@Get('/getfile/:name')
getImages(@Param('name') name, @Res() res) {
 res.sendFile(name,{ root: './uploads' })
 }



 @Get('/search/:id')
getStudentById(@Param('id') id:number): any {
return this.facultyservice.getStudentById(id)
} */




@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService,) {}

  @Get('/index')
  async getIndex(): Promise<FacultyEntity[]> {
    return this.facultyService.getIndex();
  }

  @Get('/students/:id')
  @UseGuards(SessionGuard)
  async getStudentById(@Param('id') id: number, @Session() session): Promise<StudentEntity> {
    if (!session.email){
      return; 
    }
    return this.facultyService.getStudentById(id);
  }

  @Post('/addstudent')
  @UseGuards(SessionGuard)
  async addStudent(@Body() data: StudentDTO, @Session() session): Promise<StudentEntity> {
    if (!session.email){
      return ; 
    }
    return this.facultyService.addStudent(data);
  }

  @Post('/uploadgrade')

  @UseInterceptors(

    FileInterceptor('myfile', {

      fileFilter: (req, file, cb) => {

        if (
          file.originalname.match(/^.*\.(jpg|webp|png|jpeg|docx|pdf|ppt|pptx|xlsx)$/)
        ) {
          cb(null, true);
        } else {

          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'Invalid file format'), false);
        }
      },

      limits: { fileSize: 8 * 1024 * 1024 },

      storage: diskStorage({

        destination: './uploads',

        filename: function (req, file, cb) {

          cb(null, Date.now() + file.originalname);

        },
      }),
    }),
  )

  uploadFile(@UploadedFile() myfileobj: Express.Multer.File): object {
    console.log(myfileobj);
   return { message: "file uploaded" };
  }

  @Get('/getfile/:filename')
  @UseGuards(SessionGuard)
  getFiles(@Param('filename') name, @Res() res, @Session() session) {
    if (!session.email){
      return; 
    }
    res.sendFile(name, { root: './uploads' });
  }

  

  /*@Put('/updatestudent/:id')
  async updateStudentById(
    @Param('id') id: number,
    @Body() data: StudentDTO
  ): Promise<StudentEntity> {
    return this.facultyService.updateStudentById(id, data);
  }*/
  @Put('/updatestudent/:id')
  @UseGuards(SessionGuard)
 async updateStudentById(
 @Param('id', ParseIntPipe) id: number,
 @Body() student: Partial<StudentEntity>, @Session() session
 ): Promise<object> 
   {if (!session.email)
  {
  return; 
}
 const updatedStudent = await this.facultyService.updateStudent(id, student);
 return { message: 'Student updated successfully', student: updatedStudent };
 }



 @Delete('/student/:id')
 @UseGuards(SessionGuard)
async deleteStudent(@Param('id', ParseIntPipe) id: number,  @Session() session): Promise<object> {
  if (!session.email)
  {
  return; 
}
const message = await this.facultyService.deleteStudent(id);
return { message };

 }
  @Get('/students')
  async getAllStudents(): Promise<StudentEntity[]> {
    return this.facultyService.getAllStudents();
  }

  @Get('/students/faculty/:facultyid')
  async getStudentsByFaculty(
    @Param('facultyid') facultyid: number
  ): Promise<FacultyEntity[]> {
    return this.facultyService.getStudentsByFaculty(facultyid);
  }


  @Get('PubDetails/:id')

  async getPubDetailsById(@Param('id') id: number): Promise<PublicationEntity> {

    return this.facultyService.getPubDetailsById(id);

  }


  @Put('PubDetails/:id')
  async updatePubDetails(@Param('id') id: number, @Body() publication: Partial<PublicationEntity>): Promise<object> {
    const updatedPubDetails = await this.facultyService.updatePubDetails(id, publication);
    return { message: 'Details updated successfully', publication: updatedPubDetails };

  }

  @Post('/signup')

  @UseInterceptors(FileInterceptor('image',
 
      {
 
          fileFilter: (req, file, cb) => {
 
              if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
 
                  cb(null, true);
 
              else {
 
                  cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
 
              }
 
          },
 
          limits: { fileSize: 8 * 1024* 1024 },
 
          storage: diskStorage({
 
              destination: './uploads',
 
              filename: function (req, file, cb) {
 
                  cb(null, Date.now() + file.originalname)
 
              },
 
          })
 
      }
 
  ))
 
  @UsePipes(new ValidationPipe)
 
  signup(@Body() mydata: FacultyDTO, @UploadedFile() imageobj: Express.Multer.File) {
    if (!imageobj || !imageobj.filename) {
      throw new BadRequestException('Image file is missing or invalid.');
    }
    console.log(mydata);
    console.log(imageobj.filename);
    mydata.image = imageobj.filename;
    return this.facultyService.signup(mydata);
  }

 
  @Post('logout')
  async logout(@Session() session): Promise<object> {
    session.destroy();
    return { message: 'Logout successful' };
  }
  

@Post('/signin')
async signIn(@Body() data: FacultyDTO, @Session() session) {
  const isSignInSuccessful = await this.facultyService.signIn(data);
  
  if (isSignInSuccessful) {
    session.email = data.email;
    // session.password = data.password;
    return { message: 'Login successful' };
  } else {
    return false;
  }
}



    @Get('/getstudent/:studentid')
  async getcourses(@Param('studentid', ParseIntPipe) studentid: number): Promise<object> {
    try {
      const student = await this.facultyService.getStudentById(studentid);

      if (!student) {
        throw new HttpException('Student does not exist', HttpStatus.NOT_FOUND);
      }

      const courses = await this.facultyService.getStudentById(studentid);
      return { message: 'Student found', courses };
    } catch (error) {
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Post('/send-email')
async sendEmail(@Body() emailData: { subject: string; recipient: string; content: string }): Promise<string> {
const { subject, recipient, content } = emailData;
try {
await this.facultyService.sendEmail(subject, recipient, content);
return ' Congartulations!!! Successfully send.' ;
} catch (error) {

throw new HttpException('Failed!!!', HttpStatus.INTERNAL_SERVER_ERROR);
}


}
}