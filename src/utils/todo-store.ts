import Todo from './todo';

export default class TodoStore {
  private storageKey = 'glimmer-todomvc:todos';

  fetch(): Todo[] {
    let json = localStorage.getItem(this.storageKey);

    if (json) {
      return JSON.parse(json).map(({ title, completed }) => {
        return new Todo(title, completed)
      });
    }
  }

  store(todos: Todo[]) {
    let json = JSON.stringify(
      todos.map(todo => ({
          title: todo.title,
          completed: todo.completed
      }))
    );

    localStorage.setItem(this.storageKey, json);
  }
}
