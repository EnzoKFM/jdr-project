<script setup>
import CampaignCard from "./CampaignCard.vue";

defineProps({
  campaigns: {
    type: Array,
    required: true,
  },
  showMJComments: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["activate", "edit", "duplicate", "export", "delete", "view-details"]);
</script>

<template>
  <div>
    <!-- Si aucune campagne -->
    <div 
      v-if="campaigns.length === 0" 
      class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
    >
      <div class="text-6xl mb-4">📚</div>
      <p class="text-gray-600 text-lg">Aucune campagne créée</p>
      <p class="text-gray-500 text-sm mt-2">Créez votre première campagne pour commencer !</p>
    </div>

    <!-- Liste des campagnes -->
    <div v-else class="space-y-4">
      <CampaignCard
        v-for="campaign in campaigns"
        :key="campaign.id"
        :campaign="campaign"
        :show-m-j-comment="showMJComments"
        @activate="$emit('activate', $event)"
        @edit="$emit('edit', $event)"
        @duplicate="$emit('duplicate', $event)"
        @export="$emit('export', $event)"
        @delete="$emit('delete', $event)"
        @view-details="$emit('view-details', $event)"
      />
    </div>
  </div>
</template>
