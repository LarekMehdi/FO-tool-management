import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Tools from '../pages/Tools.vue';

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "dashboard",
        component: Dashboard,
    },
    {
        path: "/tools",
        name: "tools",
        component: Tools,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;