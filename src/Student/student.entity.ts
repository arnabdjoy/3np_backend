import { FacultyEntity } from "src/Faculty/faculty.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity("Student")
export class StudentEntity{
@PrimaryGeneratedColumn()
id:number;
@Column({name:'fname',type: "varchar",length: 150})
fname:string;
@Column({name:'lname',type: "varchar",length: 150})
lname:string;
@Column({type: "varchar",length: 150})
email:string;


@ManyToOne(() => FacultyEntity, faculty => faculty.students)
faculty: FacultyEntity;

}