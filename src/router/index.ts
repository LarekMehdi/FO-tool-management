import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';

const routes: RouteRecordRaw[] = [
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;