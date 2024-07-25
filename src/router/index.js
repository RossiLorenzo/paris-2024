import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Presentation/Index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "presentation",
      component: Index,
    },
  ],
});

export default router;
