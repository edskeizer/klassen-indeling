import { Student } from './student';


export class Group {

  public students: Student[] = [];

  public constructor(public name: string) { }

  public addStudent(student: Student): Group {
    this.students.push(student);
    return this;
  }

  public assignSegmentToSingles(nrSegments: number): void {
    let counts = [];
    for (let index = 0; index < nrSegments; index++) {
      counts[index] = 0;

    }
    // const counts = [].fill(0, 0, nrSegments - 1);
    this.students.forEach(student => {
      if (student.hasSegment()) {
        counts[student.segment]++;
      }
    });
    this.students.forEach(student => {
      if (!student.hasSegment()) {
        const position = counts.indexOf(Math.min(...counts));
        student.segment = position;
        counts[position]++;
      }
    });
  }
}