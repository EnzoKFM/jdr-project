<script setup>
  import { ref, onMounted } from 'vue';
  import { watchEffect  } from "vue";

  import { useChapterStore } from "@/stores/chaptersStore";
  import useQuetesStore from "@/stores/quest";
  import { useLocationStore } from '@/stores/locationsStore';
  import ChapterModal from "./ChapterModal.vue";
  import ChapterDeleteModal from "./ChapterDeleteModal.vue";
  import ChapterStateModal from "./ChapterStateModal.vue";

  import QuestModal from "../quest/QuestModal.vue";
  import QuestList from "../quest/QuestList.vue";

  const props = defineProps({
    campaignId: {
      type: String,
      required: true,
    },
  });

  const chapterStore = useChapterStore();
  const questStore = useQuetesStore();
  const locationStore = useLocationStore();

  onMounted(() => {
    // initialQuetes = toutes les quêtes de tes chapitres
    const initialQuetes = chapterStore.listChapters().flatMap(c => c.quests)
    questStore.initQuetes(initialQuetes)
  })

  const editingChapter = ref(null);
  const chapterToDelete = ref(null);
  const editingQuest = ref(null);

  const emit = defineEmits(["move-up", "move-down"]);
  const showModalQuest = ref(false);

  const showModal = ref(false);
  const showDeleteModal = ref(false);
  const showStateModal = ref(false);

  const openCreateQuestModal = () => {
      editingQuest.value = null;
      showModalQuest.value = true;
  };

  const handleStateEdit = (chapter) => {
      editingChapter.value = chapter;
      showStateModal.value = true;
  };

  const openCreateModal = () => {
    editingChapter.value = null;
    showModal.value = true;
  };

  // Édition
  const handleEdit = (chapter) => {
    editingChapter.value = chapter;
    showModal.value = true;
  };

  const handleSaveQuest = (formData) => {
      if (!formData.chapterId) {
          alert("Veuillez sélectionner un chapitre !");
          return;
      }

      if (editingQuest.value) {
          // Mettre à jour le store global
          questStore.modifierQuete(editingQuest.value.id, formData);

          // Persister la mise à jour dans le chapitre correspondant (ou déplacer si besoin)
          // updateQuestInChapter gère la mise à jour sur place ou le déplacement vers un autre chapitre
          chapterStore.updateQuestInChapter(formData.chapterId, editingQuest.value.id, { ...editingQuest.value, ...formData });
      } else {
          // Création
          const newQuest = questStore.ajouterQuete(formData);

          // Ajouter la quête au chapitre choisi
          const chapter = chapterStore.listChapters().find(c => c.id === formData.chapterId);
          if (chapter) {
              chapterStore.addQuestToChapter(formData.chapterId, newQuest);
          }
      }

      closeModalQuest();
  };

  const closeModalQuest = () => {
      showModalQuest.value = false;
  };

  const handleSave = (formData) => {
    if (editingChapter.value) {
      // Mise à jour
      chapterStore.modifyChapter(editingChapter.value.id, formData);
    } else {
      // Création
      chapterStore.addChapter(formData);
    }
    closeModal();
  };

  // Fermer le modal
  const closeModal = () => {
    showModal.value = false;
  };

  // Suppression - Confirmation
  const handleDeleteConfirm = (chapter) => {
    chapterToDelete.value = chapter;
    showDeleteModal.value = true;
  };

  // Suppression - Exécution
  const handleDelete = () => {
    if (chapterToDelete.value) {
      chapterStore.deleteChapter(chapterToDelete.value.id);
      closeDeleteModal();
    }
  };

  // Fermer le modal de suppression
  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    chapterToDelete.value = null;
  };

  // Fermer le modal de modification d'état
  const closeStateModal = () => {
    showStateModal.value = false;
    editingChapter.value = null;
  };

  const expandedChapterId = ref(null);

  const toggleRow = (chapterId) => {
    expandedChapterId.value =
      expandedChapterId.value === chapterId ? null : chapterId;
  };

  function modifierEtatchapter(etat) {
    chapterStore.modifyStateChapter(editingChapter.value.id, etat);
    closeStateModal();
  }

  const duplicateChapter = (chapter) => {
    chapterStore.duplicateChapter(chapter);
  };
</script>

<template>
  <div class="p-4 flex flex-col gap-y-4">
    <div class="flex items-center gap-2">
      <button
          @click="openCreateModal"
          class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
      >
          <span class="text-xl">+</span>
          Nouveau Chapitre
      </button>
    </div>
    <div class="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table class="w-full border-collapse bg-white text-sm text-gray-700">
        <thead
          class="bg-gray-100 text-xs uppercase tracking-wide text-gray-600"
        >
          <tr>
            <th class="px-6 py-3 text-left font-semibold">Nom</th>
            <th class="px-6 py-3 text-left font-semibold">État</th>
            <th class="px-6 py-3 text-left font-semibold">Description</th>
            <th class="px-6 py-3 text-left font-semibold">Commentaire</th>
            <th class="px-6 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <template
            v-for="(chapter, index) in chapterStore.listChapters()"
            :key="chapter.id"
          >
            <!-- Ligne principale -->
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 font-medium text-gray-900">
                {{ chapter.name }}
              </td>

              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {{ chapter.state }}
                </span>
              </td>

              <td class="px-6 py-4 text-gray-600">
                {{ chapter.description }}
              </td>

              <td class="px-6 py-4 text-gray-600">
                {{ chapter.mjComment }}
              </td>

              <td class="flex gap-4 py-4 px-6 justify-center">
                <button
                  @click="handleEdit(chapter)"
                  class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  ✏️ Modifier
                </button>
                <button
                  @click="handleDeleteConfirm(chapter)"
                  class="bg-gradient-to-r from-rose-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  🗑️ Supprimer
                </button>
                <button
                  @click="duplicateChapter(chapter)"
                  class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  📚 Dupliquer
                </button>
                <div class="flex flex-col gap-4 mx-2">
                  <button
                    @click="emit('move-up', chapter)"
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
                    @click="emit('move-down', chapter)"
                    :disabled="index === chapterStore.listChapters().length - 1"
                    class="px-4 py-1 rounded-lg font-semibold transition-all cursor-pointer"
                    :class="
                      index === chapterStore.listChapters().length - 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-black to-gray-500 text-white hover:from-gray-600 hover:to-black'
                    "
                  >
                    ⬇️ DOWN
                  </button>
                </div>
                <button
                  @click.stop="toggleRow(chapter.id)"
                  class="bg-gradient-to-r from-neutral-500 to-stone-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-neutral-600 hover:to-stone-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  V
                </button>
              </td>
            </tr>

            <!-- Ligne dropdown -->
            <tr v-if="expandedChapterId === chapter.id">
              <td colspan="5" class="bg-gray-50 px-6 py-4">
                <div class="flex gap-4">
                  <button
                    @click="handleStateEdit(chapter)"
                    class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                  >
                    ♾️ Modifier l'état
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="expandedChapterId === chapter.id">
                <td colspan="5" class="bg-gray-50 px-6 py-4">
                    <div class="flex flex-col gap-4">
                        <div>
                            <button
                                @click="openCreateQuestModal"
                                class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                            >
                                <span class="text-xl">+</span>
                                Nouvelle Quête
                            </button>
                        </div>

                        <div>
                            <QuestList
                                :quests="chapter.quests"
                                :chapter="chapter"
                                :campaignid="props.campaignId"
                            />
                        </div>
                    </div>
                </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal de création/édition -->
  <ChapterModal
    :show="showModal"
    :chapter="editingChapter"
    @close="closeModal"
    @save="handleSave"
  />

  <!-- Modal de confirmation de suppression -->
  <ChapterDeleteModal
    :show="showDeleteModal"
    :chapter="chapterToDelete"
    @close="closeDeleteModal"
    @confirm="handleDelete"
  />

  <!-- Modal de modification d'état -->
  <ChapterStateModal
    :show="showStateModal"
    :chapter="editingChapter"
    @close="closeStateModal"
    @save="modifierEtatchapter"
  />

    <!-- Modal création / édition -->
    <QuestModal
      :show="showModalQuest"
      :quest="editingQuest"
      :chapters="chapterStore.listChapters()"
      :lieux="locationStore.listLocations()"
      @save="handleSaveQuest"
      @close="closeModalQuest"
    />

</template>