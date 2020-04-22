import { Component } from '@angular/core';
import { SchoolService } from './services/school.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'klas';

  constructor(private schoolService: SchoolService) { }
  async onSelect(event) {
    const files = event.addedFiles;
    if (files.length > 0) {
      const blob = await this.readFile(files[0]);
      this.schoolService.fromSpreadsheet(blob);
      this.schoolService.distribute(2);
      this.schoolService.toSpreadsheet();
    }
  }

  async readFile(file: File): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result as ArrayBuffer);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsArrayBuffer(file);
    });
  }
}
