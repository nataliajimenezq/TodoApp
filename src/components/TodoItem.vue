<template>
  <li class="todo" :class="{ completed: todo.completed, editing: selectedTodo?.id === todo.id }">
    <div class="view">
      <input type="checkbox" class="toggle" :checked="todo.completed" @change="toggleTodoStatus" />
      <label for="" @dblclick="editTodo">{{ todo.name }}</label>
      <button class="destroy" @click="removeTodo"></button>
    </div>
    <input
      type="text"
      class="edit"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="doneEdition"
      @keyup.enter="doneEdition"
    />
  </li>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'TodoItem',
  components: {},
  props: {
    todo: {
      type: Object,
      required: true,
      default() {
        [];
      },
    },
    modelValue: {
      type: [String, Number],
    },
  },

  setup(props) {
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

    const toggleTodoStatus = () => {
      store.commit('updateStateTodo', props.todo);
    };

    const editTodo = () => {
      store.commit('setActiveTodo', props.todo.id);
    };

    const doneEdition = () => {
      const todo = store.getters.getTodoById(props.todo.id);

      if (todo) {
        store.commit('updateTodoName', props.todo);
        store.commit('setActiveTodo', null);

        if (!props.todo.name) {
          removeTodo();
        }
      }
    };

    const removeTodo = () => {
      store.commit('removeTodo', props.todo.id);
    };

    return {
      editTodo,
      doneEdition,
      removeTodo,
      selectedTodo,
      toggleTodoStatus,
    };
  },
};
</script>
