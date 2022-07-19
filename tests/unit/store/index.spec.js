import { createStore } from 'vuex';
import store from '@/store/index.js';
import mock from '@/mock';

const createVuexStore = (initialState) =>
  createStore({
    ...store,
    state: {
      todos: [...initialState],
      activeTodo: null,
      loading: false,
      error: false,
    },
    getters: {
      getTodoById: (state) => (todoId) => state.todos.find((todo) => todo.id === todoId),
    },
    mutations: {
      setTodos: (state, todos) => (state.todos = todos),
      addTodo: (state, todo) => state.todos.unshift(todo),
      updateTodoName: (state, todo) => (state.todos.find((item) => item.id === todo.id).name = todo.name),
    },
  });

describe('Vuex', () => {
  //Basicas

  test('Initial state', () => {
    const store = createVuexStore(mock);
    const { todos, activeTodo, loading } = store.state;

    expect(activeTodo).toBeNull();
    expect(loading).toBeFalsy();
    expect(todos).toEqual(mock);
  });

  // Getters
  test('Getters -->  getTodoById', () => {
    const store = createVuexStore(mock);
    const [, , todo3] = mock;

    expect(store.getters.getTodoById(3)).toEqual(todo3);
  });

  // Mutations
  test('Mutations --> setTodo', () => {
    const store = createVuexStore([]);
    store.commit('setTodos', mock);
    expect(store.state.todos.length).toBe(3);
  });

  test('Mutations --> addTodo', () => {
    const store = createVuexStore([]);
    store.commit('addTodo', { id: 4, name: 'Go to Gym', completed: false });
    expect(store.state.todos.length).toBe(1);
    expect(store.state.todos[0].id).toBe(4);
  });

  test('Mutations --> updateTodoName', () => {
    const store = createVuexStore(mock);
    store.commit('updateTodoName', { id: 3, name: 'a', completed: false });

    const result = store.state.todos.find((item) => item.id === 3);
    expect(result.name).toBe('a');
  });
});
