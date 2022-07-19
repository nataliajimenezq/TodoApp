<template>
  <input id="toggle-all" type="checkbox" class="toggle-all" @click="toggleCompleteTodos" />
  <label for="toggle-all"></label>
  <ul class="todo-list">
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" v-model="todo.name" />
  </ul>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import TodoItem from '@/components/TodoItem.vue';

export default {
  name: 'TodoList',
  components: { TodoItem },
  props: {
    todos: {
      type: Array,
      required: true,
      default() {
        [];
      },
    },
  },

  setup() {
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

    const toggleCompleteTodos = () => {
      store.commit('toggleCompletedTodos');
    };

    return {
      selectedTodo,
      toggleCompleteTodos,
    };
  },
};
</script>
