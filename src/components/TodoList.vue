<template>
  <main class="main" v-if="todos.length">
    <input id="toggle-all" type="checkbox" class="toggle-all" @click="toggleCompleteTodos" />
    <label for="toggle-all"></label>
    <ul class="todo-list">
      <li
        class="todo"
        :class="{ completed: todo.completed, editing: selectedTodo?.id === todo.id }"
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
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'TodoList',
  components: {},
  props: {
    todos: {
      type: Array,
      required: true,
      default() {
        [];
      },
    },
  },

  setup(props, { emit }) {
    const store = useStore();

    /**
     * Computed
     */

    /**
     * Select a Active todo by Id
     */
    const selectedTodo = computed(() => {
      return store.state.activeTodo ? store.getters.getTodoById(store.state.activeTodo) : null;
    });

    /**
     * Methods
     */
    const editTodo = (todo) => {
      store.commit('setActiveTodo', todo.id);
    };

    const doneEdition = (todo) => {
      if (selectedTodo.value) {
        if (!selectedTodo.value.name) {
          removeTodo(todo);
        }

        store.commit('updateTodo', selectedTodo.value);

        store.commit('setActiveTodo', null);
      }
    };

    const removeTodo = (todo) => {
      store.commit('setActiveTodo', todo.id);
      store.commit('removeTodo', todo);
    };

    const toggleCompleteTodos = () => {
      emit('toggleAll');
    };

    return {
      selectedTodo,
      editTodo,
      doneEdition,
      removeTodo,
      toggleCompleteTodos,
    };
  },
};
</script>
