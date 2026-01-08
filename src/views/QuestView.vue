<!-- <script setup>
import { useRouter } from 'vue-router';
import QuestList from '../components/quest/QuestList.vue';
import useQuetesStore from '../stores/quest';

const router = useRouter();
const store = useQuetesStore();

function activerMj(id) {
  store.activerQueteMj(id);
}

function activer(id) {
  store.activerQuete(id, prompt('Mot de passe d\'activation ?'));
}

function resoudre(id) {
  store.resoudreQuete(id, prompt('Mot de passe de résolution ?'));
}

function abandonner(id) {
  store.abandonnerQuete(id);
}

</script> -->
<script setup>
import { ref } from "vue";
import QuestList from "../components/quest/QuestList.vue";
import QuestModal from "../components/quest/QuestModal.vue";
import useQuetesStore from "../stores/quest";

const store = useQuetesStore();

// état modale
const showModal = ref(false);
const editingQuest = ref(null);

// ouvrir création
const openCreateModal = () => {
  editingQuest.value = null;
  showModal.value = true;
};

// édition
const handleEdit = (questId) => {
  editingQuest.value = store.quetes.find(q => q.id === questId);
  showModal.value = true;
};

// sauvegarde
const handleSave = (formData) => {
  if (editingQuest.value) {
    store.modifierQuete(editingQuest.value.id, formData);
  } else {
    store.ajouterQuete(formData);
  }
  closeModal();
};

// fermer
const closeModal = () => {
  showModal.value = false;
  editingQuest.value = null;
};

// actions
const activerMj = id => store.activerQueteMj(id);
const activer = id => store.activerQuete(id, prompt("Mot de passe d'activation ?"));
const resoudre = id => store.resoudreQuete(id, prompt("Mot de passe de résolution ?"));
const abandonner = id => store.abandonnerQuete(id);
</script>

<template>
  <!-- <div class="header">
    <h2>Liste des quêtes</h2>

    <button @click="router.push({ name: 'ajouter-quete' })">
      + Ajouter une quête
    </button>
  </div> -->
 <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span class="text-3xl">🗺️</span>
        Gestion des Quêtes
      </h2>

      <button
        @click="openCreateModal"
        class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <span class="text-xl">+</span>
        Nouvelle Quête
      </button>
    </div>
    <QuestList
    :quests="store.quetes"
    @activerMj="activerMj"
    @activer="activer"
    @resoudre="resoudre"
    @abandonner="abandonner"
    @edit="handleEdit"
    @duplicate="store.dupliquerQuete"
    @delete="store.supprimerQuete"
  />
  <!-- Modal création / édition -->
    <QuestModal
      :show="showModal"
      :quest="editingQuest"
      @save="handleSave"
      @close="closeModal"
    />
  </div>

</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header h2 {
  margin: 0;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  cursor: pointer;
}

button:hover {
  background-color: #eaeaea;
}
</style>

