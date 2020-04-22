import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { Group } from '../models/group';
import * as uuid4 from 'uuid4';
import * as XLSX from 'xlsx';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private addresses: {
    [key: string]: Address
  } = {};
  private groups: {
    [key: string]: Group
  } = {};

  public getAddressByString(address: string): Address {
    if (address === '') {
      address = uuid4();
    }

    if (!this.addresses[address]) {
      this.addresses[address] = new Address(address);
    }

    return this.addresses[address];
  }

  public getGroupByName(group: string): Group {
    if (!this.groups[group]) {
      this.groups[group] = new Group(group);
    }

    return this.groups[group];
  }

  public distribute(nrSegments: number): void {
    this.assignSegmentUsingAddress(nrSegments);
    this.assignSegmentToSingles(nrSegments);
  }

  private assignSegmentUsingAddress(nrSegments: number): void {
    Object.keys(this.addresses).forEach((addressKey, i) => {
      const address = this.addresses[addressKey];
      if (address.getNumberOfStudents() >= 2) {
        const segment = i % nrSegments;
        address.getStudents().forEach(student => {
          student.segment = segment;
        })
      }
    });
  }

  private assignSegmentToSingles(nrSegments: number): void {
    Object.keys(this.groups).forEach(groupKey => {
      const group = this.groups[groupKey];
      group.assignSegmentToSingles(nrSegments);
    })
  }

  public asArray(): any {
    let result: {
      [key: string]: any[]
    } = {};
    Object.keys(this.groups).forEach(groupKey => {
      const group = this.groups[groupKey];
      result[group.name] = [];
      group.students.forEach(student => {
        result[group.name].push({
          name: student.name,
          address: student.address,
          segment: student.segment
        })
      })

    });
    return result;
  }



  fromSpreadsheet(fileContents: ArrayBuffer) {
    const data = new Uint8Array(fileContents);
    const workbook = XLSX.read(data, { type: 'array' });

    if (Object.keys(workbook.Sheets).length > 0) {
      const firstKey = Object.keys(workbook.Sheets)[0];
      const firstSheet = workbook.Sheets[firstKey];
      const workbookJSON = XLSX.utils.sheet_to_json(firstSheet);
      workbookJSON.forEach((row: any) => {
        const group = this.getGroupByName(row.Klas);
        const address = this.getAddressByString(row.Adres);
        const student = new Student(group, row.Leerling, address);
        group.addStudent(student);
        address.addStudent(student);
      })
    }

  }

  toSpreadsheet() {
    var wb = XLSX.utils.book_new();
    wb.SheetNames.push("Ingedeeld");

    let data = [];
    Object.keys(this.groups).forEach(groupKey => {
      const group = this.groups[groupKey];
      group.students.forEach(student => {
        data.push({
          Groep: group.name,
          Leerling: student.name,
          Adres: student.address.address,
          Segment: student.getSegmentPlusOne()
        });
        // console.log('row1', group.name, student.name, student.address.address, student.getSegmentPlusOne())
      })
    })
    var ws = XLSX.utils.json_to_sheet(data, { header: ["Groep", "Leerling", "Adres", "Segment"] });
    wb.Sheets["Ingedeeld"] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([this.s2ab(wbout)], { type: "application/octet-stream" });
    const blobUrl = URL.createObjectURL(blob);
    var link = document.createElement("a"); // Or maybe get it from the current document
    link.href = blobUrl;
    link.download = "ingedeeld.xlsx";
    link.innerHTML = "Click here to download the file";
    link.click();

  }

  private s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
  }
}
