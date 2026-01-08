<script setup>
import QuestCard from "./QuestCard.vue";

defineProps({
  quests: {
    type: Array,
    required: true,
  },
});

defineEmits([
  "activerMj",
  "activer",
  "resoudre",
  "abandonner",
  "edit",
  "duplicate",
  "delete",
]);
</script>

<template>
  <div>
    <!-- Aucune quête -->
    <div
      v-if="quests.length === 0"
      class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
    >
      <div class="text-6xl mb-4">🗺️</div>
      <p class="text-gray-600 text-lg">Aucune quête créée</p>
    </div>

    <!-- Liste -->
    <div v-else class="space-y-4">
      <QuestCard
        v-for="quest in quests"
        :key="quest.id"
        :quest="quest"
        @activerMj="$emit('activerMj', $event)"
        @activer="$emit('activer', $event)"
        @resoudre="$emit('resoudre', $event)"
        @abandonner="$emit('abandonner', $event)"
        @edit="$emit('edit', $event)"
        @duplicate="$emit('duplicate', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>
