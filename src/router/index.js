import { createRouter, createWebHashHistory } from 'vue-router';
import TodoList from '../components/TodoList.vue';

const routes = [
  {
    path: '/',
    name: 'All',
    component: TodoList,
  },

  {
    path: '/active',
    name: 'Active',
    component: TodoList,
  },
  {
    path: '/completed',
    name: 'Completed',
    component: TodoList,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
