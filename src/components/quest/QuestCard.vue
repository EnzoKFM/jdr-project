<script setup>
import { computed } from "vue";

const props = defineProps({
  quest: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
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
  "move-up",
  "move-down",
]);

const statusLabel = computed(() => {
  const labels = {
    "inactive": "Inactive",
    "active": "Activé",
    "terminée": "Terminé",
    "abandonnée": "Abandonnée",

  };
  return labels[props.quest.etat];
});

const statusClass = computed(() => {
  const classes = {
    inactive: "bg-gray-200 text-gray-700",
    active: "bg-blue-100 text-blue-700",
    terminee: "bg-green-100 text-green-700",
    abandonnee: "bg-orange-100 text-orange-700",
  };
  return classes[props.quest.etat];
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-md border-2 p-6">
    <!-- Header -->
    <div class="flex justify-between items-start mb-4 text-left">
      <div>
        <h3 class="text-xl font-bold">
          🧭 {{ quest.nom }}
        </h3>

        <p class="text-gray-600 text-sm mt-1">
          {{ quest.description }}
        </p>

        <p
          v-if="quest.lieu && quest.lieu.length > 0"
          class="text-xs text-gray-500 mt-1"
        >
          📍 {{ quest.lieu }}
        </p>

        <span
          class="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold"
          :class="statusClass"
        >
          {{ statusLabel }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-wrap gap-2 pt-4 border-t">
      <button
        v-if="quest.etat === 'inactive'"
        @click="$emit('activerMj', quest.id)"
        class="btn btn-blue cursor-pointer"
      >
        ⭐ Activer (MJ)
      </button>

      <button
        v-if="quest.etat !== 'terminee' && quest.etat !== 'abandonnee'"
        @click="$emit('abandonner', quest.id)"
        class="btn btn-orange cursor-pointer"
      >
        ❌ Abandonner
      </button>

      <button
        @click="$emit('edit', quest.id)"
        class="btn btn-cyan cursor-pointer"
      >
        ✏️ Modifier
      </button>

      <button
        @click="$emit('duplicate', quest.id)"
        class="btn btn-indigo cursor-pointer"
      >
        📋 Dupliquer
      </button>

      <div class="flex flex-col gap-4 mx-2">
        <button
          @click="$emit('move-up', quest)"
          :disabled="index === 0"
          class="px-4 py-1 rounded-lg font-semibold transition-all cursor-pointer"
          :class="
            index === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-black to-gray-500 text-white hover:from-gray-600 hover:to-black'
          "
        >
          ⬆️ UP
        </button>

        <button
          @click="$emit('move-down', quest)"
          :disabled="index === quests.length - 1"
          class="px-4 py-1 rounded-lg font-semibold transition-all cursor-pointer"
          :class="
            index === quests.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-black to-gray-500 text-white hover:from-gray-600 hover:to-black'
          "
        >
          ⬇️ DOWN
        </button>
      </div>

      <button
        @click="$emit('delete', quest.id)"
        class="btn btn-red ml-auto cursor-pointer"
      >
        🗑️ Supprimer
      </button>
    </div>
  </div>
</template>

<style scoped>
  .text-left {
    text-align: left;
  }
</style>


