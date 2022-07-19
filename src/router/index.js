import { createRouter, createWebHashHistory } from 'vue-router';
import TodoPage from '@/views/TodoPage.vue';

const routes = [
  {
    path: '/:route',
    component: TodoPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
