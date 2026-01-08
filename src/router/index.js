import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import MJView from "@/views/MJView.vue";
import PlayerView from "@/views/PlayerView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import CampaignDetailView from "@/components/campaign/CampaignDetailView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/mj",
    name: "mj",
    component: MJView,
  },

  {
    path: "/mj/campaigns/:id",
    name: "mj-campaign-detail",
    component: CampaignDetailView,
  },

  {
    path: "/player",
    name: "player",
    component: PlayerView,
  },

  // Not Found
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;