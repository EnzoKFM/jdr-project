<script setup>
import { useInterfaceStore } from "@/stores/interfaceStore";
import { useCampaignStore } from "@/stores/campaignStore";

const interfaceStore = useInterfaceStore();
const campaignStore = useCampaignStore();
</script>

<template>
  <footer class="bg-white border-t border-gray-200 mt-12">
    <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600"
      >
        <!-- Info gauche -->
        <div class="flex items-center gap-4">
          <span class="font-semibold">
            {{ interfaceStore.currentModeIcon }} Mode
            {{ interfaceStore.currentModeLabel }}
          </span>
          <span class="text-gray-400">|</span>
          <span
            v-if="campaignStore.activeCampaign"
            class="text-blue-600 font-medium"
          >
            ⭐ {{ campaignStore.activeCampaign.name }}
          </span>
          <span v-else class="text-gray-400"> Aucune campagne active </span>
        </div>

        <!-- Info droite -->
        <div class="flex items-center gap-4">
          <span>📚 {{ campaignStore.campaignsCount }} campagne(s)</span>
          <span class="text-gray-400">|</span>
          <span>Projet JDR - Aboubakr ZENNIR - Enzo K. - Marevan CONTI - Dorian</span>
        </div>
      </div>
    </div>
  </footer>
</template>
