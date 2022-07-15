<template>
  <section class="todoapp">
    <header>
      <h1>todos</h1>
      <TodoInput v-model="newTodo" @addTodo="addTodo" />
    </header>
    <router-view :todos="filteredTodos" @removeTodo="removeTodo" />

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
      <button class="clear-completed" @click="clearCompleted">Clear completed</button>
    </footer>
  </section>
</template>

<script>
import { ref, computed } from 'vue';
import TodoInput from '@/components/TodoInput';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {
    TodoInput,
  },

  setup() {
    const todosList = ref([]);
    const routesNames = ref(['All', 'Active', 'Completed']);
    const newTodo = ref('');
    const route = useRoute();

    const currentRouteName = computed(() => route.name);

    const pluralizeRemaining = computed(() => {
      const item = filteredTodos.value.length;
      return `${item} item${item === 1 ? '' : 's'} left`;
    });

    const filteredTodos = computed(() => {
      if (currentRouteName.value === 'All') {
        return todosList.value;
      } else if (currentRouteName.value === 'Active') {
        return todosList.value.filter((todo) => !todo.completed);
      } else {
        return todosList.value.filter((todo) => todo.completed);
      }
    });

    const addTodo = (todo) => {
      if (newTodo.value) {
        todosList.value.push({
          name: todo,
          completed: false,
          editing: false,
          id: filteredTodos.value.length,
        });
        newTodo.value = '';
      }
    };

    const removeTodo = (todo) => {
      const index = todosList.value.indexOf(todo);
      if (index !== -1) {
        todosList.value.splice(todosList.value.indexOf(todo), 1);
      }
    };

    const clearCompleted = () => {
      const incompleted = todosList.value.filter((todo) => todo.completed !== true);
      todosList.value = incompleted;
    };

    return {
      todosList,
      newTodo,
      addTodo,
      pluralizeRemaining,
      filteredTodos,
      currentRouteName,
      routesNames,
      removeTodo,
      clearCompleted,
    };
  },
};
</script>
