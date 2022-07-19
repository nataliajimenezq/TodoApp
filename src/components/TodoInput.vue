<template>
  <input
    type="text"
    class="new-todo"
    autofocus
    :placeholder="placehoder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @keyup.enter="$emit('addTodo', modelValue)"
  />
</template>
<script>
export default {
  name: 'TodoInput',

  props: {
    modelValue: {
      type: [String, Number],
    },
    placehoder: {
      type: [String],
      default: 'Whats needs to be done？',
    },
  },
};
</script>
