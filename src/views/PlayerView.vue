<script setup>
import Header from "@/components/utils/Header.vue";
import Footer from "@/components/utils/Footer.vue";
import { useCampaignStore } from "@/stores/campaignStore";

const campaignStore = useCampaignStore();
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 flex flex-col"
  >
    <Header />

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Info campagne active -->
        <div
          v-if="campaignStore.activeCampaign"
          class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg p-6 mb-8"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm opacity-90">Campagne en cours</p>
              <h2 class="text-2xl font-bold">
                ⭐ {{ campaignStore.activeCampaign.name }}
              </h2>
              <p class="text-sm opacity-90 mt-1">
                {{ campaignStore.activeCampaign.description }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-else
          class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-8"
        >
          <div class="flex items-center">
            <span class="text-2xl mr-3">⚠️</span>
            <p class="text-sm text-yellow-700">
              Aucune campagne active. Demandez au Maître du Jeu d'en activer une
              !
            </p>
          </div>
        </div>

        <div class="text-center py-12">
          <div class="text-6xl mb-6">🎮</div>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">
            Interface Joueur
          </h2>
          <p class="text-gray-600 mb-6">
            Cette section est en cours de développement.
          </p>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>
