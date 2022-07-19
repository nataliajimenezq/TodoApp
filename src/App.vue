<template>
  <section class="todoapp">
    <header>
      <h1>todos</h1>
      <TodoInput v-model="newTodo" @addTodo="addTodo" />
    </header>
    <router-view />

    <footer class="footer" v-if="todosList.length">
      <span class="todo-count">
        <strong>{{ pluralizeRemaining }}</strong>
      </span>
      <ul class="filters">
        <li v-for="route in routesNames" :key="route">
          <router-link
            :to="{ path: `${route.toLowerCase()}` }"
            @click="setCurrentRoute(route)"
            :class="{ selected: currentRouteName === route }"
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
/* import { useRoute } from 'vue-router'; */

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
    /*     const route = useRoute(); */
    const routesNames = ref(['All', 'Active', 'Completed']);
    const newTodo = ref('');

    /**
     * Computed
     */
    const todosList = computed(() => store.state.todos);
    const currentRouteName = computed(() => store.state.currentRoute);
    const hasCompleteTodo = computed(() => store.getters.getCompleteTodos);

    const pluralizeRemaining = computed(() => {
      const item = store.getters.getIncompleteTodos.length;
      return `${item} item${item === 1 ? '' : 's'} left`;
    });

    /**
     * Initial render(mocks for now)
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
          id: todosList.value.length + 1,
        };
        store.commit('addTodo', note);
        newTodo.value = '';
      }
    };

    const setCurrentRoute = (route) => {
      store.commit('setCurrentRoute', route);
    };

    /**
     * Call to Store mutation to Delete all Todos
     */
    const clearCompleted = () => {
      store.commit('removeAllCompleted');
    };

    return {
      todosList,
      newTodo,
      addTodo,
      pluralizeRemaining,
      currentRouteName,
      routesNames,
      clearCompleted,
      hasCompleteTodo,
      setCurrentRoute,
    };
  },
};
</script>
