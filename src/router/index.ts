/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory, type RouteRecordRaw,  } from 'vue-router';

import LandingPage from '@/pages/LandingPage.vue';

const routes: RouteRecordRaw[] = [
  {
    name: 'LandingPage',
    path: '/',
    component: LandingPage,
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
