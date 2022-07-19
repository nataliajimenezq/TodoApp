<template>
  <main class="main" v-if="filteredTodos.length">
    <TodoList :todos="filteredTodos" />
  </main>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import TodoList from '@/components/TodoList';

export default {
  name: 'TodoPage',
  components: {
    TodoList,
  },

  setup() {
    const store = useStore();

    /**
     * Computed
     */
    const todosList = computed(() => store.state.todos);
    const currentRoutePath = computed(() => store.state.currentRoute);

    const filteredTodos = computed(() => {
      const filterStore = {
        All: () => todosList.value,
        Active: () => store.getters.getIncompleteTodos,
        Completed: () => store.getters.getCompleteTodos,
      };
      return filterStore[currentRoutePath.value]();
    });

    return {
      filteredTodos,
    };
  },
};
</script>
