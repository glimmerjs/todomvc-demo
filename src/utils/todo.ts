import { tracked } from "@glimmer/component";

let _idSequence = 0;

export default class Todo {
  private _id: number;

  @tracked title: string;
  @tracked completed: boolean;

  constructor(title: string, completed: boolean = false) {
    this._id = _idSequence++;
    this.title = title;
    this.completed = completed;
  }

  toggle() {
    this.completed = !this.completed;
  }
}
