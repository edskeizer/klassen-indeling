import { Address } from './address';
import { Group } from './group';

export class Student {

  public segment: number;

  public constructor(public group: Group, public name: string, public address: Address) { }

  public getSegmentPlusOne(): number {
    return this.segment + 1;
  }

  // public setSegment(segment: number): Student {
  //   this.segment = segment;
  //   return this;
  // }

  public hasSegment(): boolean {
    return this.segment !== undefined;
  }
}