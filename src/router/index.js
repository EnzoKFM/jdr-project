import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import MJView from "@/views/MJView.vue";
import PlayerView from "@/views/PlayerView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import CampaignDetailView from "@/components/campaign/CampaignDetailView.vue";
import CampaignManager from "@/components/campaign/CampaignManager.vue";
import QuestView from '@/views/QuestView.vue';

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  // Route MJ
  {
    path: "/mj",
    component: MJView,
    children: [
      {
        path: "",
        name: "mj",
        component: CampaignManager,
      },
      {
        path: "campaigns/:id",
        component: CampaignDetailView,
        children: [
          {
            path: "",
            name: "mj-campaign-detail",
          },
        ],
      },
    ],
  },

  {
    path: "/player",
    name: "player",
    component: PlayerView,
  },
  
  { path: '/quetes', name: 'quetes', component: QuestView, },
  { path: '/quetes/ajouter', name: 'ajouter-quete', component: () => import('@/views/AddQuestView.vue'), },
  { path: '/modifier/:questId', name: 'modifier', component: () => import('@/views/EditQuestView.vue'), },

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