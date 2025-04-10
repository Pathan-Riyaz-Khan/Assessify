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
    component: () => import("@/components/signIn/ChallengerLogin.vue"),
  },
  {
    name: "ChallengerRegistration",
    path: "/challenger-registration",
    component: () => import("@/components/signUp/ChallengerRegistration.vue"),
  },
  {
    name: "AdminRegistration",
    path: "/admin-registration",
    component: () => import("@/components/signUp/AdminRegistration.vue"),
  },
  {
    name: "AdminLogin",
    path: "/admin-login",
    component: () => import("@/components/signIn/AdminLogin.vue"),
  },

  {
    name: "Assessor",
    path: "/admin",
    redirect: "/admin/dashboard",
    component: () => import("@/pages/default/AdminDefault.vue"),
    children: [
      {
        name: "AssessorDashboard",
        path: "dashboard",
        component: () =>
          import("@/components/AdminComponents/AssessorDashboard.vue"),
      },
      {
        name: "AssessorLibrary",
        path: "library",
        redirect: "library/createdByMe",
        component: () =>
          import("@/components/AdminComponents/AssessorLibrary.vue"),
        children: [
          {
            name: "CreatedByMe",
            path: "createdByMe",
            component: () =>
              import("@/components/AdminComponents/CreatedByMe.vue"),
          },
          {
            name: "PreviouslyUsed",
            path: "previouslyUsed",
            component: () =>
              import("@/components/AdminComponents/PreviouslyUsed.vue"),
          },
          {
            name: "LikedByMe",
            path: "likedByMe",
            component: () =>
              import("@/components/AdminComponents/LikedByMe.vue"),
          },
          {
            name: "SharedWithMe",
            path: "sharedWithMe",
            component: () =>
              import("@/components/AdminComponents/SharedWithMe.vue"),
          },
        ],
      },
      {
        name: "AssessorReports",
        path: "reports",

        component: () =>
          import("@/components/AdminComponents/AssessorReports.vue"),
      },
      {
        name: "AdminProfile",
        path: "profile",
        component: () =>
          import("@/components/AdminComponents/AssessorProfile.vue"),
      },
      {
        name: "AdminSettings",
        path: "settings",
        component: () =>
          import("@/components/AdminComponents/AssessorSettings.vue"),
      },
    ],
  },

  {
    name: "User",
    path: "/user",
    redirect: "/user/dashboard",
    component: () => import("@/pages/default/UserDefault.vue"),
    children: [
      {
        name: "UserDashboard",
        path: "dashboard",
        component: () =>
          import("@/components/UserComponents/UserDashboard.vue"),
      },
      {
        name: "UserActivity",
        path: "activity",
        component: () => import("@/components/UserComponents/UserActivity.vue"),
      },
      {
        name: "UserReport",
        path: "report",
        component: () => import("@/components/UserComponents/UserReport.vue"),
      },
      {
        name: "UserProfile",
        path: "profile",
        component: () => import("@/components/UserComponents/UserProfile.vue"),
      },
      {
        name: "UserSettings",
        path: "settings",
        component: () => import("@/components/UserComponents/UserSettings.vue"),
      },
    ],
  },
  {
    name: "QuizCreation",
    path: "/admin/create",
    component: () => import("@/pages/quizPages/QuizCreation.vue"),
  },
  {
    name: "Questions",
    path: "/quizzes/questions",
    component: () => import("@/pages/questionPages/QuestionList.vue"),
  },
  {
    name: "AssessorQuizReport",
    path: "/admin/quiz-report",
    component: () =>
      import("@/components/AdminComponents/AssessorQuizReport.vue"),
  },
  {
    name: "JoinQuiz",
    path: "/user/join",
    component: () => import("@/pages/quizPages/JoinQuiz.vue"),
  },
  {
    name: "QuizAttempt",
    path: "/user/quiz-attempt",
    component: () => import("@/pages/quizPages/QuizAttempt.vue"),
  },
  {
    name: "UserQuizPreview",
    path: "/user-quiz-preview",
    component: () => import("@/pages/quizPages/UserQuizPreview.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
