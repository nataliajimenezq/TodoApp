import { createStore } from 'vuex';
import HttpService from '@/services/base-http.service';

export default createStore({
  state: {
    todos: [],
    activeTodo: null,
    loading: false,
    error: false,
  },
  getters: {
    getTodoById: (state) => (todoId) => state.todos.find((todo) => todo.id === todoId),
    getIncompleteTodos: (state) => state.todos.filter((todo) => !todo.completed),
    getCompleteTodos: (state) => state.todos.filter((todo) => todo.completed),
  },

  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },

    addTodo(state, todo) {
      state.todos.unshift(todo);
    },

    setActiveTodo(state, todoId) {
      state.activeTodo = todoId;
    },

    updateTodo(state, todo) {
      state.todos.find((item) => item.id === todo.id).name = todo.name;
    },

    updateStateTodo(state, todo) {
      console.log(todo);
      state.todos.find((item) => item.id === todo.id).completed = !todo.completed;
    },

    removeTodo(state) {
      const index = state.todos.findIndex((todo) => todo.id === state.activeTodo);
      state.todos.splice(index, 1);
      state.activeTodo = null;
    },

    removeAllCompleted(state) {
      const incompleteTodos = state.todos.filter((todo) => todo.completed !== true);

      state.todos = incompleteTodos;
    },

    toggleCompletedTodos(state) {
      const incompleted = state.todos.filter((todo) => todo.completed !== true);
      if (incompleted.length) {
        incompleted.forEach((todo) => (todo.completed = !todo.completed));
      } else {
        state.todos.forEach((todo) => (todo.completed = !todo.completed));
      }
    },
  },

  actions: {
    //TODO: Implement json server to test it
    //Call to Todo Services to get Data and saves into todos State Array
    async getTodos() {
      try {
        this.loading = true;
        const todosService = new HttpService();

        this.todos = await todosService.get();
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    async removeTodo(id) {
      try {
        this.loading = true;
        const todosService = new HttpService();

        await todosService.delete(id);
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    async editTodo(id, body) {
      try {
        this.loading = true;
        const todosService = new HttpService();

        await todosService.patch(id, body);
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    async createTodo(body) {
      try {
        this.loading = true;
        const todosService = new HttpService();

        await todosService.post(body);
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },

  modules: {},
});
