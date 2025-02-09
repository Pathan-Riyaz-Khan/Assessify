/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "LandingPage",
    path: "/",
    component: () => import("@/pages/LandingPage.vue"),
  },
  {
    name: "StudentLogin",
    path: "/challenger-login",
    component: () => import("@/components/ChallengerLogin.vue"),
  },
  {
    name: "ChallengerRegistration",
    path: "/challenger-registration",
    component: () => import("@/components/ChallengerRegistration.vue"),
  },
  {
    name: "AdminRegistration",
    path: "/admin-registration",
    component: () => import("@/pages/AdminRegistration.vue"),
  },
  {
    name: "AdminLogin",
    path: "/admin-login",
    component: () => import("@/pages/AdminLogin.vue"),
  },
  {
    name: "Assessor",
    path: "/admin",
    redirect: "/admin/dashboard",
    component: () => import("@/pages/AdminDefault.vue"),
    children: [
      {
        name: "AssessorDashboard",
        path: "dashboard",
        component: () => import("@/components/AssessorDashboard.vue"),
      },
      {
        name: "AssessorLibrary",
        path: "library",
        redirect: "library/createdByMe",
        component: () => import("@/pages/AssessorLibrary.vue"),
        children: [
          {
            name: "CreatedByMe",
            path: "createdByMe",
            component: () => import("@/components/CreatedByMe.vue"),
          },
          {
            name: "PreviouslyUsed",
            path: "previouslyUsed",
            component: () => import("@/components/PreviouslyUsed.vue"),
          },
          {
            name: "LikedByMe",
            path: "likedByMe",
            component: () => import("@/components/LikedByMe.vue"),
          },
          {
            name: "SharedWithMe",
            path: "sharedWithMe",
            component: () => import("@/components/SharedWithMe.vue"),
          },
          {
            name: "AllMyContent",
            path: "allMyContent",
            component: () => import("@/components/AllMyContent.vue"),
          },
        ],
      },
      {
        name: "AssessorReports",
        path: "reports",
        component: () => import("@/pages/AssessorReports.vue"),
      },
    ],
  },
  {
    name: "QuizCreation",
    path: "/admin/create",
    component: () => import("@/pages/QuizCreation.vue"),
  },
  {
    name: "Questions",
    path: "/questions",
    component: () => import("@/pages/Questions.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
