import { IsEmail, IsNumber, IsString } from "class-validate";
import { IsEmpty, IsNotEmpty, Matches } from "class-validator";

export class FacultyDTO{
  id: string;

@IsString({message:"Invalid name"})
@Matches( /^[a-zA-Z]+$/, {message:"enter a proper name"})
name: string;

@IsEmail({message:"Invalid email"})
email : string;
password: string;
phone: number;
image: string; 
}

export class NoticeDTO {
    @IsString({ message: "Invalid format" })
    @IsEmpty({ message: "Can't be empty!" })
    date: string;
    
    text: string;
  }

  export class PublicationDTO {
    id:number;

    @IsString({ message: "Invalid format" })
    @IsEmpty({ message: "Can't be empty!" })
    date: string;
    
    text: string;
  }

  export class FacultyUpdateDTO{
    id:number;

    @IsString({message:"Invalid name"})
    @Matches( /^[a-z A-Z]+$/, {message:"enter a proper name"})
    @IsNotEmpty({ message: "Name can't be empty!" })
      name: string;

    @IsEmail({message:"Invalid email"})
    @IsNotEmpty({ message: "Mail can't be empty!" })
     email: string;

     @IsString({message:"Invalid password."})
     @IsNotEmpty({ message: "Pass can't be empty!" })
     password: string;
 }

 export class NoticeUpdateDTO{
    @IsString({message:"Can't be empty!"})
    text: string;
 }

 export class PublicationUpdateDTO{
    @IsString({message:"Can't be empty!"})
    text: string;
 }
  
 export class StudentDTO{
    @IsNumber()
    @IsNotEmpty()
    id:number;

    @IsString({message:"Invalid name"})
    @IsNotEmpty({ message: "Name can't be empty!" })
    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper name"})
    name: string;
    
    @IsEmail({message:"Invalid email"} )
    @IsNotEmpty({ message: "Mail can't be empty!" })
    email : string;

    @IsNotEmpty({ message: "Pass can't be empty!" })
    password: string;
    }

    
      export class FacultyLoginDTO {
   
       @IsEmail( { message:"invalid email" })
      email: string;
      password: string;
   
   }
