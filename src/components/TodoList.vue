<template>
  <main class="main" v-if="todos.length">
    <input id="toggle-all" type="checkbox" class="toggle-all" />
    <label for="toggle-all"></label>
    <ul class="todo-list">
      <li
        class="todo"
        :class="{ completed: todo.completed, editing: selectedTodo === todo }"
        v-for="todo in todos"
        :key="todo.id"
      >
        <div class="view">
          <input type="checkbox" class="toggle" v-model="todo.completed" />
          <label for="" @dblclick="editTodo(todo)">{{ todo.name }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input
          type="text"
          class="edit"
          :id="todo.name"
          v-model="todo.name"
          @blur="doneEdition(todo)"
          @keyup.enter="doneEdition(todo)"
        />
      </li>
    </ul>
  </main>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array,
      default() {
        [];
      },
    },
  },

  setup(props, { emit }) {
    const selectedTodo = ref(null);

    const editTodo = (todo) => {
      selectedTodo.value = todo;
    };

    const doneEdition = (todo) => {
      selectedTodo.value = null;
      todo.name = todo.name.trim();
      if (!todo.name) {
        removeTodo(todo);
      }
    };

    const removeTodo = (todo) => {
      console.log('cuantas');
      emit('removeTodo', todo);
    };

    return {
      editTodo,
      doneEdition,
      removeTodo,
      selectedTodo,
    };
  },
};
</script>
