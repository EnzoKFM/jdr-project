<script setup>
import { computed } from "vue";

const props = defineProps({
  quest: {
    type: Object,
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

const statusLabel = computed(() => {
  const labels = {
    inactive: "Inactive",
    active: "Active",
    terminee: "Terminée",
    abandonnee: "Abandonnée",

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
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-bold">
          🧭 {{ quest.nom }}
        </h3>

        <p class="text-gray-600 text-sm mt-1">
          {{ quest.description }}
        </p>

        <p class="text-xs text-gray-500 mt-1">
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
        class="btn btn-blue"
      >
        ⭐ Activer (MJ)
      </button>

      <button
        v-if="quest.etat === 'inactive'"
        @click="$emit('activer', quest.id)"
        class="btn btn-green"
      >
        ▶️ Activer (Joueur)
      </button>

      <button
        v-if="quest.etat === 'active'"
        @click="$emit('resoudre', quest.id)"
        class="btn btn-purple"
      >
        ✅ Résoudre
      </button>

      <button
        v-if="quest.etat !== 'terminee' && quest.etat !== 'abandonnee'"
        @click="$emit('abandonner', quest.id)"
        class="btn btn-orange"
      >
        ❌ Abandonner
      </button>

      <button
        @click="$emit('edit', quest.id)"
        class="btn btn-cyan"
      >
        ✏️ Modifier
      </button>

      <button
        @click="$emit('duplicate', quest.id)"
        class="btn btn-indigo"
      >
        📋 Dupliquer
      </button>

      <button
        @click="$emit('delete', quest.id)"
        class="btn btn-red ml-auto"
      >
        🗑️ Supprimer
      </button>
    </div>
  </div>
</template>


