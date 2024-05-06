import { ObjectId } from "mongodb";

export class CompetitionModel {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public logo: string,
    public _id?: ObjectId
  ) {}
}
