import { StudentEntity } from "src/Student/student.entity";
import { PublicationEntity } from "src/publication/publication.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

/*@Entity("faculty")
export class FacultyEntity{
@PrimaryGeneratedColumn()
id: number;

@Column({nullable:true})
Name: string;

@Column({nullable:true})
phone: string;

@Column({nullable:true})
email:string;

@Column({nullable:true})
password:string;

@Column({nullable:true})
filenames:string;

@OneToMany(() => StudentEntity, student => student.faculty)
 students: StudentEntity[];


 @OneToOne(()=> PublicationEntity, publication => publication.faculty)
 publications: PublicationEntity[];
} */

@Entity("faculty")
export class FacultyEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable:true})
    name: string;
    @Column({nullable:true})
    email: string;
    @Column({nullable:true})
    password: string;
    @Column({nullable:true})
    phone: number;
    @Column({nullable:true})
    image: string;

    @OneToMany(() => StudentEntity, student => student.faculty)
 students: StudentEntity[];


 @OneToOne(()=> PublicationEntity, publication => publication.faculty)
 publications: PublicationEntity[];
}