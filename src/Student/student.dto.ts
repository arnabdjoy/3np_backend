import { IsEmail, IsString } from "class-validate";
import { Matches } from "class-validator";

export class StudentDTO{

    @IsString({message:"invalid name"})
    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper name"})
     name: string;
 
   @IsEmail({message:"invalid email"})
     email: string; 
     password: string;
 
   }
   import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';




  export class StudentUpdateDTO{

    id:number;
    name: string;
     email: string;
     password: string;

 }