import Todo from './todo';

export default class TodoStore {

  private storageKey = 'todos-glimmer';

  restore(): Todo[]  {

    const todos = JSON.parse(localStorage.getItem(this.storageKey));

    if (!todos) {
      return [];
    }

    return todos.map(todo => new Todo(todo.title, todo.completed, todo.id));

  }

  store(todoList: Todo[]) {

    localStorage.setItem(this.storageKey, JSON.stringify(todoList.map(todo => this.serialize(todo))));

  }

  serialize(todo: Todo) {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    }
  }

}
