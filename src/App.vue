<template>
  <section class="todoapp">
    <header>
      <h1>todos</h1>
      <TodoInput v-model="newTodo" @addTodo="addTodo" />
    </header>
    <router-view :todos="filteredTodos" @toggleAll="toggleAll" />

    <footer class="footer" v-if="todosList.length">
      <span class="todo-count">
        <strong>{{ pluralizeRemaining }}</strong>
      </span>
      <ul class="filters">
        <li v-for="route in routesNames" :key="route">
          <router-link :to="{ name: route }" :class="{ selected: currentRouteName === route }"
            >{{ route }}
          </router-link>
        </li>
      </ul>
      <button class="clear-completed" @click="clearCompleted" v-if="hasCompleteTodo.length">Clear completed</button>
    </footer>
  </section>
</template>

<script>
import todos from '@/mock';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import TodoInput from '@/components/TodoInput';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {
    TodoInput,
  },

  setup() {
    /**
     * Store,Routes and Variables
     */
    const store = useStore();
    const route = useRoute();
    const routesNames = ref(['All', 'Active', 'Completed']);
    const newTodo = ref('');

    /**
     * Computed
     */
    const todosList = computed(() => store.state.todos);
    const currentRouteName = computed(() => route.name || 'All');
    const hasCompleteTodo = computed(() => store.getters.getCompleteTodos);

    const pluralizeRemaining = computed(() => {
      const item = filteredTodos.value.length;
      return `${item} item${item === 1 ? '' : 's'} left`;
    });

    const filteredTodos = computed(() => {
      const filterStore = {
        All: () => todosList.value,
        Active: () => todosList.value.filter((todo) => todo.completed === false),
        Completed: () => todosList.value.filter((todo) => todo.completed === true),
      };
      return filterStore[currentRouteName.value]();
    });

    /**
     * Initial render(mock for now)
     */
    onMounted(() => {
      //Load Todos mock
      store.commit('setTodos', todos);
    });

    /**
     * Create a new Todo and save it in store
     */
    const addTodo = (todo) => {
      if (newTodo.value) {
        const note = {
          name: todo,
          completed: false,
          id: filteredTodos.value.length + 1,
        };
        store.commit('addTodo', note);
        newTodo.value = '';
      }
    };

    /**
     * Call to Store mutation to Delete all Todos
     */
    const clearCompleted = () => {
      store.commit('removeAllCompleted');
    };

    /**
     * Call to Store mutation to complete All Todos and toggle
     */
    const toggleAll = () => {
      store.commit('toggleCompletedTodos');
    };

    return {
      todosList,
      newTodo,
      addTodo,
      pluralizeRemaining,
      filteredTodos,
      currentRouteName,
      routesNames,
      clearCompleted,
      toggleAll,
      hasCompleteTodo,
    };
  },
};
</script>
