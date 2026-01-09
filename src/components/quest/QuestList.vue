<script setup>
import { ref } from 'vue';
import QuestCard from "./QuestCard.vue";
import QuestModal from "./QuestModal.vue";
import useQuetesStore from "@/stores/quest";
import { useChapterStore } from '@/stores/chaptersStore';



const props = defineProps({
  quests: {
    type: Array,
    required: true
  },
  chapter: {
    type: Object,
    required: false
  }
});


const editingQuest = ref(null);
const showModalQuest = ref(false);

const questStore = useQuetesStore();
const chapterStore = useChapterStore()

const handleEditQuest = (quest) => {
  editingQuest.value = quest;
  showModalQuest.value = true;
};

const handleDeleteQuest = (quest) => {
    questStore.supprimerQuete(quest.id);
    chapterStore.removeQuestFromChapter(props.chapter.id, quest.id);
};

const handleDuplicateQuest = (quest) => {
  console.log("Duplication de la quête avec l'ID :", quest.id);
    const newQuest = questStore.dupliquerQuete(quest.id);
    if (newQuest) {
        chapterStore.addQuestToChapter(props.chapter.id, newQuest);
    }
};

const handleActivateMjQuest = (quest) => {
    // Mettre à jour la quête dans le chapitre
    const q = chapter.quests.find(q => q.id === quest.id);
    if (q) q.etat = 'active';
};

const handleActivateQuest = (quest) => {
    const pwd = prompt("Mot de passe d'activation ?");
    if (questStore.activerQuete(quest.id, pwd) === false) alert("Mot de passe incorrect");
};

const handleResolveQuest = (quest) => {
    const pwd = prompt("Mot de passe de résolution ?");
    const rewards = questStore.resoudreQuete(quest.id, pwd);
    if (!rewards) alert("Mot de passe incorrect");
};

const handleAbandonQuest = (quest) => {
    questStore.abandonnerQuete(quest.id);
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
            console.log('chapter found for new quest:', chapter);
            if (chapter) {
                chapterStore.addQuestToChapter(formData.chapterId, newQuest);
            }
        }

        closeModalQuest();
    };

    const closeModalQuest = () => {
        showModalQuest.value = false;
    };

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
        v-for="quest in quests.filter(q => q && q.id)"
        :key="quest.id"
        :quest="quest"
        @activerMj="handleActivateMjQuest(quest)"
        @activer="handleActivateQuest(quest)"
        @resoudre="handleResolveQuest(quest)"
        @abandonner="handleAbandonQuest(quest)"
        @edit="handleEditQuest(quest)"
        @duplicate="handleDuplicateQuest(quest)"
        @delete="handleDeleteQuest(quest)"
      />

      <QuestModal
      :show="showModalQuest"
      :quest="editingQuest"
      :chapters="chapterStore.listChapters()"
      @save="handleSaveQuest"
      @close="() => showModalQuest.value = false"
    />
    </div>
  </div>
</template>
