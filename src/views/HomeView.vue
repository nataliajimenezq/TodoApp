<template>
  <section class="todoapp">
    <header>
      <h1>todos</h1>
    </header>
    <input type="text" class="new-todo" autofocus placeholder="Whats needs to be done？" />
    <main class="main">
      <input id="toggle-all" type="checkbox" class="toggle-all" />
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <li class="todo">
          <div class="view">
            <input type="checkbox" class="toggle" />
            <label for="">{{ 'to do ' }}</label>
            <button class="destroy"></button>
          </div>
          <input type="text" class="edit" />
        </li>
      </ul>
    </main>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ 'x items left' }}</strong>
      </span>
      <ul class="filters">
        <li>
          <a href="#/all">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <button class="clear-completed">Clear completed</button>
    </footer>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
};
</script>
