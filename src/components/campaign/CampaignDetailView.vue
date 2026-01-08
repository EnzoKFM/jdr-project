<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCampaignStore } from "@/stores/campaignStore";

const route = useRoute();
const router = useRouter();
const campaignStore = useCampaignStore();

// Onglet actif
const activeTab = ref("overview");

// Onglets disponibles
const tabs = [
  { id: "overview", label: "Vue d'ensemble", icon: "📊" },
  { id: "chapters", label: "Chapitres", icon: "📑" },
  { id: "players", label: "Joueurs", icon: "👥" },
  { id: "contents", label: "Contenus", icon: "🗂️" },
];

// Récupérer la campagne
const campaignId = computed(() => route.params.id);
const campaign = computed(() =>
  campaignStore.campaigns.find((c) => c.id === campaignId.value)
);

// Navigation
const goBack = () => {
  router.push({ name: "mj" });
};

const handleExport = () => {
  campaignStore.exportCampaign(campaignId.value);
};

// Helpers
const getStatusIcon = (status) => {
  const icons = {
    brouillon: "📝",
    disponible: "✅",
    active: "⭐",
  };
  return icons[status] || "📄";
};

const getStatusLabel = (status) => {
  const labels = {
    brouillon: "Brouillon",
    disponible: "Disponible",
    active: "Active",
  };
  return labels[status] || status;
};

const getStatusBadgeClass = (status) => {
  const classes = {
    brouillon: "bg-gray-200 text-gray-700",
    disponible: "bg-green-100 text-green-700",
    active: "bg-blue-100 text-blue-700",
  };
  return classes[status] || "bg-gray-200 text-gray-700";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <div>
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <button
            @click="goBack"
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span class="text-2xl">←</span>
          </button>
          <div v-if="campaign">
            <h1
              class="text-3xl font-bold text-gray-900 flex items-center gap-3"
            >
              {{ getStatusIcon(campaign.status) }} {{ campaign.name }}
            </h1>
            <p class="text-sm text-gray-500 mt-1">
              {{ campaign.description }}
            </p>
          </div>
          <div v-else>
            <h1 class="text-3xl font-bold text-gray-900">
              Campagne introuvable
            </h1>
          </div>
        </div>

        <!-- Badge du statut -->
        <span
          v-if="campaign"
          class="px-4 py-2 rounded-full text-sm font-semibold"
          :class="getStatusBadgeClass(campaign.status)"
        >
          {{ getStatusLabel(campaign.status) }}
        </span>
      </div>
    </div>

    <!-- Onglets -->
    <div v-if="campaign" class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8 px-6">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-4 px-1 border-b-2 font-medium text-sm transition-all"
            :class="
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            "
          >
            <span class="text-lg mr-2">{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Contenu des onglets -->
      <div class="p-6">
        <!-- Onglet Vue d'ensemble -->
        <div v-if="activeTab === 'overview'">
          <h2 class="text-xl font-bold mb-4">📊 Vue d'ensemble</h2>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Informations générales -->
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-bold text-lg mb-3 text-blue-900">
                ℹ️ Informations
              </h3>
              <div class="space-y-2 text-sm">
                <div><strong>Nom :</strong> {{ campaign.name }}</div>
                <div>
                  <strong>Statut :</strong>
                  {{ getStatusIcon(campaign.status) }} {{ campaign.name }}
                </div>
                <div>
                  <strong>Description :</strong>
                  {{ campaign.description || "Aucune" }}
                </div>
                <div>
                  <strong>Créée le :</strong>
                  {{ formatDate(campaign.createdAt) }}
                </div>
                <div>
                  <strong>Modifiée le :</strong>
                  {{ formatDate(campaign.updatedAt) }}
                </div>
              </div>
            </div>

            <!-- Commentaire MJ -->
            <div
              class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400"
            >
              <h3 class="font-bold text-lg mb-3 text-yellow-900">
                💬 Note MJ (privée)
              </h3>
              <p class="text-sm text-yellow-800">
                {{ campaign.mjComment || "Aucun commentaire" }}
              </p>
            </div>

            <!-- Statistiques -->
            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-bold text-lg mb-3 text-green-900">
                📈 Statistiques
              </h3>
              <div class="space-y-2 text-sm">
                <div>
                  👥
                  <strong>{{ campaign.players?.length || 0 }}</strong> joueurs
                </div>
                <div>
                  📑
                  <strong>{{ campaign.chapters?.length || 0 }}</strong>
                  chapitres
                </div>
              </div>
            </div>

            <!-- Actions rapides -->
            <div class="bg-purple-50 p-4 rounded-lg">
              <h3 class="font-bold text-lg mb-3 text-purple-900">
                ⚡ Actions rapides
              </h3>
              <div class="space-y-2">
                <button
                  @click="handleExport"
                  class="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all text-sm font-semibold"
                >
                  📤 Exporter
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Onglet Chapitres  -->
        <div v-else-if="activeTab === 'chapters'">
          <h2 class="text-xl font-bold mb-4">📑 Gestion des Chapitres</h2>
          <div class="text-center py-12 bg-gray-50 rounded-lg">
            <div class="text-6xl mb-4">🚧</div>
            <p class="text-xl text-gray-600 mb-2">Section en développement</p>
          </div>
        </div>

        <!-- Onglet Joueurs (placeholder pour collègue) -->
        <div v-else-if="activeTab === 'players'">
          <h2 class="text-xl font-bold mb-4">👥 Gestion des Joueurs</h2>
          <div class="text-center py-12 bg-gray-50 rounded-lg">
            <div class="text-6xl mb-4">🚧</div>
            <p class="text-xl text-gray-600 mb-2">Section en développement</p>
          </div>
        </div>

        <!-- Onglet Contenus (placeholder pour collègue) -->
        <div v-else-if="activeTab === 'contents'">
          <h2 class="text-xl font-bold mb-4">🗂️ Contenus Réutilisables</h2>
          <div class="text-center py-12 bg-gray-50 rounded-lg">
            <div class="text-6xl mb-4">🚧</div>
            <p class="text-xl text-gray-600 mb-2">Section en développement</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message si campagne non trouvée -->
    <div v-else class="bg-white rounded-lg shadow-md p-12 text-center">
      <div class="text-6xl mb-4">❌</div>
      <p class="text-xl text-gray-600 mb-4">Campagne introuvable</p>
      <button
        @click="goBack"
        class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all font-semibold"
      >
        ← Retour à la liste
      </button>
    </div>
  </div>
</template>
