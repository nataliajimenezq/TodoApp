<template>
  <input
    type="text"
    class="new-todo"
    autofocus
    placeholder="Whats needs to be done？"
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
  },
};
</script>
