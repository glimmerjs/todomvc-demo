import Component, { tracked } from "@glimmer/component";
import Navigo from 'navigo';

const router = new Navigo(null, true);

class Todo {
  id: number = Date.now();
  title: string;
  @tracked completed: boolean;

  constructor(title, completed=false) {
    this.title = title;
    this.completed = completed;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

export default class TodoMVCApp extends Component {
  @tracked todos: Todo[] = [];
  @tracked mode: string = 'all';

  constructor(options) {
    super(options);

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

  onNewTodoKeyDown(event) {
    if (event.which === 13) {
      let value = event.target.value.trim();

      if (value.length > 0) {
        this.createTodo(value);
      }

      event.target.value = '';
    }
  }

  createTodo(title) {
    this.todos.push(new Todo(title));
    this.todos = this.todos;
  }

  removeTodo(todo) {
    this.todos = this.todos.filter(t => t !== todo);
  }

  editTodo(todo, title) {
    todo.title = title;
    this.todos = this.todos;
  }

  toggleTodo(todo) {
    todo.toggle();
    this.todos = this.todos;
  }

  toggleAll() {
    let allCompleted = this.allCompleted;
    this.todos.forEach(todo => todo.completed = !allCompleted);
    this.todos = this.todos;
  }

  clearCompleted() {
    this.todos = this.activeTodos;
  }
}
