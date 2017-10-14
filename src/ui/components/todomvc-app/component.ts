import Component, { tracked } from "@glimmer/component";
import Navigo from 'navigo';
import TodoStore from '../../../utils/todo-store';
import Todo from '../../../utils/todo';
import { ENTER } from '../../../utils/keys';

const router = new Navigo(null, true);

export default class TodoMVCApp extends Component {

  @tracked todos: Todo[] = [];
  @tracked mode: string = 'all';

  constructor(options) {
    super(options);

    this.todoStore = new TodoStore();
    this.todos = this.todoStore.fetch() || [];

    router
      .on({
        '/': () => { this.mode = 'all'; },
        '/active': () => { this.mode = 'active'; },
        '/completed': () => { this.mode = 'completed'; },
      })
      .resolve();
  }

  @tracked('todos') get activeTodos() {
    return this.todos.filter(todo => !todo.completed)
  }

  @tracked('todos') get completedTodos() {
    return this.todos.filter(todo => todo.completed)
  }

  @tracked('todos', 'mode') get visibleTodos() {
    switch (this.mode) {
      case 'all': return this.todos;
      case 'active': return this.activeTodos;
      case 'completed': return this.completedTodos;
    }
  }

  @tracked('todos') get allCompleted() {
    return this.todos.every(todo => todo.completed);
  }

  @tracked('todos') get canToggle() {
    return this.todos.length > 0;
  }

  handleNewTodoKeyDown(event) {
    if (event.which === ENTER) {
      let value = event.target.value.trim();

      if (value.length > 0) {
        this.createTodo(value);
      }

      event.target.value = '';
    }
  }

  commitTodos(todos = this.todos) {
    this.todos = todos;
    this.todoStore.store(todos);
  }

  createTodo(title) {
    this.todos.push(new Todo(title));
    this.commitTodos();
  }

  removeTodo(removedTodo) {
    this.commitTodos(this.todos.filter(todo => todo !== removedTodo))
  }

  editTodo(todo, title) {
    if (/^\s*$/.test(title)) {
      this.removeTodo(todo);
    } else {
      todo.title = title;
      this.commitTodos();
    }
  }

  toggleTodo(todo) {
    todo.toggle();
    this.commitTodos();
  }

  toggleAll() {
    let allCompleted = this.allCompleted;
    this.todos.forEach(todo => todo.completed = !allCompleted);
    this.commitTodos();
  }

  clearCompleted() {
    this.commitTodos(this.activeTodos);
  }
}
