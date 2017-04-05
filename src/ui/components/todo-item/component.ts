import Component, { tracked } from "@glimmer/component";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27

export default class TodoItem extends Component {
  @tracked editing: boolean = false;
  @tracked newTitle: string;

  beginEdit() {
    this.editing = true;
    this.newTitle = this.args.todo.title;

    requestAnimationFrame(() => {
      this.element.querySelector('.js-edit').focus();
    });
  }

  commitEdit() {
    if (this.editing) {
      this.editing = false;
      this.args.onEdit(this.args.todo, this.newTitle);
    }
  }

  abortEdit() {
    this.editing = false;
    this.newTitle = null;
  }

  handleEditKeyUp(event) {
    this.newTitle = event.target.value.trim();
    
    if (event.which === ENTER_KEY) {
      this.commitEdit();
    } else if (event.which === ESCAPE_KEY) {
      this.abortEdit();
    }
  } 
}
