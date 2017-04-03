import Component, { tracked } from "@glimmer/component";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27

export default class TodoItem extends Component {
  @tracked editing = false;
  @tracked newTitle;

  beginEdit() {
    this.editing = true;
    this.newTitle = this.args.todo.title;
  }

  commitEdit() {
    this.editing = false;
    this.args.onEdit(this.args.todo, this.newTitle);
  }

  abortEdit() {
    this.editing = false;
    this.newTitle = null;
  }

  handleEditKeyDown(event) {
    if (event.which === ENTER_KEY) {
      event.target.blur();
    } else if (event.which === ESCAPE_KEY) {
      this.abortEdit();
    }
  } 
}
