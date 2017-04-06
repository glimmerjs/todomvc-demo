import { tracked } from "@glimmer/component";

export default class Todo {
  id: number;
  title: string;
  @tracked completed: boolean;

  constructor(title: string, completed: boolean = false, id: number = Date.now()) {
    this.title = title;
    this.completed = completed;
    this.id = id;

  }

  toggle() {
    this.completed = !this.completed;
  }

}