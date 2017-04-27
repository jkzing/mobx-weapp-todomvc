import {observable, computed} from 'mobx';

let id = 0;

class TodoStore {
    /* some observable state */
    @observable todos = [];

    /* a derived value */
    @computed get completedCount() {
        return this.todos.filter(todo => todo.completed).length;
    }

    addTodo(title) {
        this.todos.push({id: id++, title, completed: false});
    }

    toggleAll(checked) {
        this.todos.forEach(
            todo => todo.completed = checked
        );
    }

};

const todoStore = new TodoStore();

export const addTodo = title => {
    todoStore.todos.push({id: id++, title, completed: false});
}

export const toggleAll = checked => {
    todoStore.todos.forEach(
        todo => todo.completed = checked
    );
}

export default todoStore;
