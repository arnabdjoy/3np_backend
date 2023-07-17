
import { FacultyEntity } from "src/Faculty/faculty.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("publication")
export class PublicationEntity{
@PrimaryGeneratedColumn()
id: number;

@Column()
StudentName: string;

@Column()
ResearchName: string;

@Column()
FacultyName: string;

@Column()
Date: String;

@OneToOne(() => FacultyEntity, faculty => faculty.publications)
 faculty: FacultyEntity;
}