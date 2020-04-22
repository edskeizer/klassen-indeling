import { Student } from './student';
import * as sha1 from 'sha1';

export class Address {
  private students: Student[] = [];

  public constructor(public address: string) { }

  public getId(): string {
    return sha1(this.address);
  }

  public addStudent(student: Student): Address {
    this.students.push(student);
    return this;
  }

  public getStudents(): Student[] {
    return this.students;
  }

  public getNumberOfStudents(): number {
    return this.students.length;
  }
}