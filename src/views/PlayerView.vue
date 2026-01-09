<script setup>
import Header from "@/components/utils/Header.vue";
import Footer from "@/components/utils/Footer.vue";
import { useCampaignStore } from "@/stores/campaignStore";
import { useLocationStore } from "@/stores/locationsStore";
import { useChapterStore } from "@/stores/chaptersStore";
import { computed, ref } from "vue";

const campaignStore = useCampaignStore();
const locationStore = useLocationStore();
const chapterStore = useChapterStore();

// Récupérer la campagne
const campaignId = computed(() => campaignStore.activeCampaignId);
const campaign = computed(() => {
  if (campaignId.value != null) {
    return campaignStore.campaigns.find((c) => c.id === campaignId.value);
  }

  return null;
});
locationStore.setCampaignId(campaignId.value);
chapterStore.setCampaignId(campaignId.value);

const selectedPlayerId = ref("");
const searchQuery = ref("");
const statusFilter = ref("all");
const moveToLocation = ref("");
const activateChapterPassword = ref("");
const completeChapterPassword = ref("");
const questAction = ref("activate");
const questPassword = ref("");

// Joueur sélectionné
const selectedPlayer = computed(() => {
  if (!campaign.value || !selectedPlayerId.value) return null;
  return campaign.value.players?.find(({ id }) => id == selectedPlayerId.value);
});

// Nombre de chapitres
const totalChaptersCount = computed(
  () => campaign.value?.chapters?.length || 0
);

// Nombre de chapitres termninées
const completedChaptersCount = computed(
  () =>
    campaign.value?.chapters?.filter((c) => c.state === "Terminé").length || 0
);

// Pourcentage de progression
const progressPercentage = computed(() =>
  totalChaptersCount.value > 0
    ? Math.round(
        (completedChaptersCount.value / totalChaptersCount.value) * 100
      )
    : 0
);

// Chapitres filtrés
const filteredChapters = computed(() => {
  if (!campaign.value?.chapters) return [];

  let chapters = campaign.value.chapters;

  // Filtre par statut
  if (statusFilter.value !== "all") {
    chapters = chapters.filter((c) => c.state === statusFilter.value);
  }

  // Filtre par recherche
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    chapters = chapters.filter(
      (c) =>
        c.name?.toLowerCase().includes(query) ||
        c.quests?.some((q) => q.name?.toLowerCase().includes(query))
    );
  }

  return chapters;
});

// Helpers pour les styles
const getChapterIcon = (state) => {
  const icons = {
    Terminé: "✅",
    Activé: "📑",
    Inactif: "🔒",
    abandoned: "❌",
  };
  return icons[state] || "📄";
};

const getChapterBorderClass = (state) => {
  const classes = {
    Terminé: "border-green-200 bg-green-50",
    Activé: "border-blue-400 bg-blue-50",
    Inactif: "border-gray-300 bg-gray-50",
    abandoned: "border-red-200 bg-red-50",
  };
  return classes[state] || "border-gray-300 bg-gray-50";
};

const getChapterBadgeClass = (state) => {
  const classes = {
    Terminé: "bg-green-200 text-green-800",
    Activé: "bg-blue-200 text-blue-800",
    Inactif: "bg-gray-200 text-gray-600",
    abandoned: "bg-red-200 text-red-800",
  };
  return classes[state] || "bg-gray-200 text-gray-600";
};

const getChapterStatusLabel = (state) => {
  const labels = {
    Terminé: "✅ TERMINÉ",
    Activé: "🟢 ACTIF",
    Inactif: "VERROUILLÉ",
    abandoned: "❌ ABANDONNÉ",
  };
  return labels[state] || state;
};

const getQuestBorderClass = (state) => {
  const classes = {
    Terminé: "border-green-500",
    Actif: "border-blue-500",
    Inactif: "border-gray-400",
    abandoned: "border-red-500",
  };
  return classes[state] || "border-gray-400";
};

const getQuestBadgeClass = (state) => {
  const classes = {
    Terminé: "bg-green-100 text-green-700",
    Actif: "bg-blue-100 text-blue-700",
    Inactif: "bg-gray-200 text-gray-600",
    abandoned: "bg-red-100 text-red-700",
  };
  return classes[state] || "bg-gray-200 text-gray-600";
};

const getQuestStatusLabel = (state) => {
  const labels = {
    Terminé: "TERMINÉE",
    Actif: "ACTIF",
    Inactif: "VERROUILLÉE",
    abandoned: "ABANDONNÉE",
  };
  return labels[state] || state;
};

const availableLocations = computed(() => {
  const locations = locationStore.listLocations();

  console.log(locations);
  return locations;
  // return ["Taverne du Dragon", "Forêt Maudite", "Temple Ancien"];
});

const handleMove = () => {
  alert(`TODO : Déplacement vers ${moveToLocation.value}`);
};

const handleActivateChapter = () => {
  console.log("Mot de passe : ", activateChapterPassword.value);

  const isActivated = chapterStore.activeChapter(activateChapterPassword);

  if (isActivated) {
    alert("Un nouveau chapitre à été activé !");
  } else {
    alert("Mot de passe incorrect");
  }

  // alert("TODO : Activation du chapitre");
};

const handleCompleteChapter = () => {
  console.log("Mot de passe : ", completeChapterPassword.value);

  const isCompleted = chapterStore.completeChapter(
    completeChapterPassword.value
  );

  if (isCompleted) {
    alert("Un nouveau chapitre à été compléter !");
  } else {
    alert("Mot de passe incorrect");
  }

  // alert("TODO : Complétion du chapitre");
};

const handleQuestAction = () => {
  alert(`TODO : ${questAction.value} de la quête`);
};

const handleAvailableItemsForPlayer = computed(() => {
  const tab = [];
  if (selectedPlayer) {
    campaign.value.items.forEach((item) => {
      if (item.playerId === selectedPlayer?.value?.id) {
        if (selectedPlayer.value.inventory.includes(item.id)) {
          tab.push(item);
        }
      }
    });
  }
  return tab;
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 flex flex-col"
  >
    <Header />

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Si campagne active -->
      <div v-if="campaign">
        <div
          class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg p-6 shadow-lg mb-6"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm opacity-90">Campagne en cours</p>
              <h2 class="text-3xl font-bold">⭐ {{ campaign.name }}</h2>
              <p class="text-sm opacity-90 mt-1">
                {{ campaign.description }}
              </p>
            </div>
            <div class="text-right bg-white/20 rounded-lg p-4">
              <div class="text-3xl mb-2">📊</div>
              <p class="text-sm font-semibold">
                {{ completedChaptersCount }}/{{ totalChaptersCount }}
                chapitres
              </p>
              <p class="text-xs opacity-80">
                {{ progressPercentage }}% complétés
              </p>
            </div>
          </div>
        </div>

        <!-- 2 colonnes ( on afiche dans la premiere les chapitres et dans le dexieme les joueurs) -->
        <div class="grid lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">
            <!-- COLONNE chapitres/quetes -->
            <div class="lg:col-span-2 space-y-6">
              <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex justify-between items-center mb-4">
                  <h3
                    class="text-xl font-bold text-gray-800 flex items-center gap-2"
                  >
                    <span class="text-2xl">📊</span>
                    Chapitres/Quêtes
                  </h3>
                  <div class="flex gap-2">
                    <select
                      v-model="statusFilter"
                      class="border-2 border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="Activé">🟢 Activé</option>
                      <option value="Terminé">✅ Terminé</option>
                      <option value="Inactif">⚪ Inactif</option>
                      <option value="abandoned">❌ Abandonnée</option>
                    </select>
                  </div>
                </div>

                <!-- Recherche -->
                <div class="mb-4">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="🔍 Rechercher un chapitre ou une quête..."
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <!-- Liste des chapitres/quêtes filtrés -->
                <div v-if="filteredChapters.length > 0" class="space-y-4">
                  <div
                    v-for="chapter in filteredChapters"
                    :key="chapter.id"
                    class="border-2 rounded-lg p-4"
                    :class="getChapterBorderClass(chapter.state)"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="text-xl">{{
                            getChapterIcon(chapter.state)
                          }}</span>
                          <h4 class="font-bold text-gray-800">
                            {{ chapter.name }}
                          </h4>
                          <span
                            class="px-2 py-1 text-xs font-bold rounded-full"
                            :class="getChapterBadgeClass(chapter.state)"
                          >
                            {{ getChapterStatusLabel(chapter.state) }}
                          </span>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">
                          {{ chapter.description }}
                        </p>

                        <!-- Quêtes du chapitre si actif -->
                        <div
                          v-if="chapter.quests && chapter.quests.length > 0"
                          class="space-y-2 ml-6 mt-3"
                        >
                          <div
                            v-for="quest in chapter.quests"
                            :key="quest.id"
                            class="bg-white border-l-4 p-3 rounded"
                            :class="getQuestBorderClass(quest.state)"
                          >
                            <div class="flex justify-between items-center">
                              <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                  <span class="text-lg">🎯</span>
                                  <span class="font-semibold text-sm">{{
                                    quest.name
                                  }}</span>
                                  <span
                                    class="px-2 py-0.5 text-xs font-bold rounded"
                                    :class="getQuestBadgeClass(quest.state)"
                                  >
                                    {{ getQuestStatusLabel(quest.state) }}
                                  </span>
                                </div>
                                <p class="text-xs text-gray-600 mb-1">
                                  {{ quest.description }}
                                </p>
                                <div class="flex gap-2 text-xs text-gray-500">
                                  <span v-if="quest.location"
                                    >📍 {{ quest.location }}</span
                                  >
                                  <span v-if="quest.reward"
                                    >🎁 {{ quest.reward }}</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-else class="mt-2">non</div>

                        <div class="flex gap-3 text-xs text-gray-500 mt-3">
                          <span
                            >🎯 {{ chapter.quests?.length || 0 }} quêtes</span
                          >
                          <span v-if="chapter.reward"
                            >🎁 {{ chapter.reward }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Aucun résultat -->
                <div v-else class="text-center py-8 text-gray-500">
                  <div class="text-4xl mb-2">🔍</div>
                  <p>Aucun chapitre ou quête trouvé</p>
                </div>
              </div>
            </div>
          </div>

          <!-- COLONNE DROITE : Joueur -->
          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h3
                class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"
              >
                <span class="text-xl">👤</span>
                Je veut être le joueur ...
              </h3>
              <select
                v-model="selectedPlayerId"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-sm font-semibold"
              >
                <option value="">Sélectionner un joueur</option>
                <option
                  v-for="player in campaign.players"
                  :key="player.id"
                  :value="player.id"
                >
                  {{ player.icon || "👤" }} {{ player.name }}
                </option>
              </select>
            </div>

            <!-- Actions du joueur -->
            <div
              v-if="selectedPlayer"
              class="bg-white rounded-lg shadow-lg p-6"
            >
              <h3
                class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"
              >
                <span class="text-xl">⚡</span>
                Actions
              </h3>

              <!-- Déplacement -->
              <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >📍 Se déplacer</label
                >
                <select
                  v-model="moveToLocation"
                  class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm mb-2"
                >
                  <option value="">Choisir un lieu</option>
                  <option
                    v-for="location in availableLocations"
                    :key="location.id"
                    :value="location.id"
                  >
                    {{ location.name }}
                  </option>
                </select>
                <button
                  @click="handleMove"
                  :disabled="!moveToLocation"
                  class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🚶 Se déplacer
                </button>
              </div>

              <hr class="my-4" />

              <!-- Activation chapitre -->
              <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >📑 Activer un chapitre</label
                >
                <input
                  v-model="activateChapterPassword"
                  type="password"
                  placeholder="Mot de passe requis"
                  class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm mb-2"
                />
                <button
                  @click="handleActivateChapter"
                  class="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 text-sm"
                >
                  🔓 Activer le chapitre
                </button>
              </div>

              <hr class="my-4" />

              <!-- Compléter chapitre -->
              <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >✅ Compléter un chapitre</label
                >
                <input
                  v-model="completeChapterPassword"
                  type="password"
                  placeholder="Mot de passe requis"
                  class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm mb-2"
                />
                <button
                  @click="handleCompleteChapter"
                  class="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 text-sm"
                >
                  ✔️ Compléter le chapitre
                </button>
              </div>

              <hr class="my-4" />

              <!-- Activation/Complétion quête -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >🎯 Action sur une quête</label
                >
                <select
                  v-model="questAction"
                  class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm mb-2"
                >
                  <option value="activate">Activer une quête</option>
                  <option value="complete">Compléter une quête</option>
                </select>
                <input
                  v-model="questPassword"
                  type="password"
                  placeholder="Mot de passe requis"
                  class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm mb-2"
                />
                <button
                  @click="handleQuestAction"
                  class="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 text-sm"
                >
                  ⚡ Valider l'action
                </button>
              </div>

              <!-- Info importante -->
              <div
                class="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded"
              >
                <p class="text-xs text-yellow-800">
                  ⚠️ Pour compléter une quête, vous devez être au bon
                  emplacement
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- COLONNE objects -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h3
                class="text-xl font-bold text-gray-800 flex items-center gap-2"
              >
                <span class="text-2xl">📑</span>
                Objets
              </h3>
            </div>

            <!-- Liste des chapitres/quêtes filtrés -->
            <div
              v-if="handleAvailableItemsForPlayer.length > 0"
              class="space-y-4"
            >
              <div
                v-for="item in handleAvailableItemsForPlayer"
                :key="item.id"
                class="border-2 rounded-lg p-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="font-bold text-gray-800">
                        {{ item.name }}
                      </h4>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Aucun résultat -->
            <div v-else class="text-center py-8 text-gray-500">
              <div class="text-4xl mb-2">🔍</div>
              <p>Aucun object trouvé</p>
            </div>
          </div>
        </div>

        <!-- COLONNE indices -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h3
                class="text-xl font-bold text-gray-800 flex items-center gap-2"
              >
                <span class="text-2xl">📑</span>
                Indices
              </h3>
            </div>

            <!-- Liste des chapitres/quêtes filtrés -->
            <div v-if="campaign.clues.length > 0" class="space-y-4">
              <div
                v-for="item in campaign.clues"
                :key="item.id"
                class="border-2 rounded-lg p-4"
                :class="getChapterBorderClass(item.state)"
              >
                <div class="flex justify-between items-start mb-2">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xl">{{
                        getChapterIcon(item.state)
                      }}</span>
                      <h4 class="font-bold text-gray-800">
                        {{ item.name }}
                      </h4>
                      <span
                        class="px-2 py-1 text-xs font-bold rounded-full"
                        :class="getChapterBadgeClass(item.state)"
                      >
                        {{ getChapterStatusLabel(item.state) }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Aucun résultat -->
            <div v-else class="text-center py-8 text-gray-500">
              <div class="text-4xl mb-2">🔍</div>
              <p>Aucun indice trouvé</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Si aucune campagne active -->
      <div v-else class="bg-white rounded-lg shadow-lg p-12 text-center">
        <div class="text-6xl mb-6">🎮</div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">
          Aucune campagne active
        </h2>
        <p class="text-gray-600 mb-6">
          Le Maître du Jeu doit activer une campagne pour commencer.
        </p>
        <p class="text-sm text-gray-500">
          Attendez que le MJ lance une campagne depuis son interface.
        </p>
      </div>
    </main>

    <Footer />
  </div>
</template>
