<script setup>
import { computed } from "vue";

const props = defineProps({
  campaign: {
    type: Object,
    required: true,
  },
  showMJComment: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["activate", "edit", "duplicate", "export", "delete", "view-details"]);

const isActive = computed(() => props.campaign.status === "active");

const statusIcon = computed(() => {
  const icons = {
    brouillon: "📝",
    disponible: "✅",
    active: "⭐",
  };
  return icons[props.campaign.status] || "📄";
});

const statusLabel = computed(() => {
  const labels = {
    brouillon: "Brouillon",
    disponible: "Disponible",
    active: "Active",
  };
  return labels[props.campaign.status] || props.campaign.status;
});

const statusBadgeClass = computed(() => {
  const classes = {
    brouillon: "bg-gray-200 text-gray-700",
    disponible: "bg-green-100 text-green-700",
    active: "bg-blue-100 text-blue-700",
  };
  return classes[props.campaign.status] || "bg-gray-200 text-gray-700";
});

const borderClass = computed(() => {
  return isActive.value ? "border-blue-400" : "border-gray-200";
});

const formattedDate = computed(() => {
  const date = new Date(props.campaign.createdAt);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
});

const formattedUpdatedDate = computed(() => {
  const date = new Date(props.campaign.updatedAt);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
});
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2"
    :class="borderClass"
  >
    <div class="p-6">
      <!-- En-tête -->
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <h3 class="text-xl font-bold text-gray-800">
              {{ statusIcon }} {{ campaign.name }}
            </h3>
            <span
              class="px-3 py-1 rounded-full text-xs font-semibold"
              :class="statusBadgeClass"
            >
              {{ statusLabel }}
            </span>
          </div>

          <p v-if="campaign.description" class="text-gray-600 text-sm mb-2">
            {{ campaign.description }}
          </p>

          <!-- Commentaire MJ (visible uniquement en mode MJ) -->
          <div
            v-if="showMJComment && campaign.mjComment"
            class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mt-3 rounded"
          >
            <p class="text-xs font-semibold text-yellow-800 mb-1">
              💬 Note MJ:
            </p>
            <p class="text-sm text-yellow-700">{{ campaign.mjComment }}</p>
          </div>

          <div class="flex gap-4 text-xs text-gray-500 mt-3">
            <span>👥 {{ campaign.players?.length || 0 }} joueurs</span>
            <span>📑 {{ campaign.chapters?.length || 0 }} chapitres</span>
            <span>🕐 Créé le {{ formattedDate }}</span>
            <span>⌛ Modifié le {{ formattedUpdatedDate }}</span>
          </div>
        </div>

        <!-- Bouton activer (si pas déjà active) -->
        <button
          v-if="!isActive"
          @click="$emit('activate', campaign.id)"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all font-semibold text-sm whitespace-nowrap"
        >
          ⭐ Activer
        </button>

        <div
          v-else
          class="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold text-sm"
        >
          ✅ Active
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-2 flex-wrap pt-4 border-t border-gray-200">
        <button
          @click="$emit('view-details', campaign.id)"
          class="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-all text-sm font-semibold flex items-center gap-1 cursor-pointer"
        >
          👁️ Détails
        </button>

        <button
          @click="$emit('edit', campaign)"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all text-sm font-semibold flex items-center gap-1 cursor-pointer"
        >
          ✏️ Modifier
        </button>

        <button
          @click="$emit('duplicate', campaign.id)"
          class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all text-sm font-semibold flex items-center gap-1 cursor-pointer"
        >
          📋 Dupliquer
        </button>

        <button
          @click="$emit('export', campaign.id)"
          class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all text-sm font-semibold flex items-center gap-1 cursor-pointer"
        >
          📤 Exporter
        </button>

        <button
          @click="$emit('delete', campaign)"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all text-sm font-semibold flex items-center gap-1 ml-auto cursor-pointer"
        >
          🗑️ Supprimer
        </button>
      </div>
    </div>
  </div>
</template>
