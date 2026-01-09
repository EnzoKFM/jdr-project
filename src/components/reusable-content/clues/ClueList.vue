<script setup>
    import { ref } from 'vue';
    import { useClueStore } from '@/stores/cluesStore';
    import ClueModal from './ClueModal.vue';
    import ClueDeleteModal from './ClueDeleteModal.vue';

    const props = defineProps({
        campaignId : { type: String }
    })

    const clueStore = useClueStore()
    clueStore.setCampaignId(props.campaignId)

    const editingClue = ref(null);
    const clueToDelete = ref(null);

    const showModal = ref(false);
    const showDeleteModal = ref(false);

    // Créer
    const handleCreate = () => {
        editingClue.value = null;
        showModal.value = true;
    };

    // Editer
    const handleEdit = (item) => {
        editingClue.value = item;
        showModal.value = true;
    };

    // Supprimer
    const handleDeleteConfirm = (item) => {
        clueToDelete.value = item;
        showDeleteModal.value = true;
    };

    // Créer/Editer - Exécution
    const handleSave = (formData) => {
        if (editingClue.value) {
            // Mise à jour
            clueStore.modifyClue(editingClue.value.id, formData);
        } else {
            // Création
            clueStore.addClue(formData);
        }
        closeModal();
    };

    // Suppression - Exécution
    const handleDelete = () => {
        if (clueToDelete.value) {
            clueStore.deleteClue(clueToDelete.value.id, ""); // A MODIFIER
            closeDeleteModal();
        }
    };

    // Fermer le modal
    const closeModal = () => {
        editingClue.value = null;
        showModal.value = false;
    };

    // Fermer le modal de suppression
    const closeDeleteModal = () => {
        showDeleteModal.value = false;
        clueToDelete.value = null;
    };

    const duplicateItem = (clue) => {
        clueStore.duplicateClue(clue)
    }

    const giveClueToAll = (clue) => {
        clueStore.giveClue(clue.id)
    }

    const takeClueToAll = (clue) => {
        clueStore.takeClue(clue.id)
    }
</script>

<template>
    <div class="p-4 flex flex-col gap-y-4">
        <div class="space-y-2">
            <button
                @click="handleCreate"
                class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
            >
                <span class="text-xl">+</span>
                Nouvelle Indice
            </button>
        </div>
        <div class="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table class="w-full border-collapse bg-white text-sm text-gray-700">
                
                <thead class="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
                <tr>
                    <th class="px-6 py-3 text-left font-semibold">Nom</th>
                    <th class="px-6 py-3 text-left font-semibold">Description</th>
                    <th class="px-6 py-3 text-left font-semibold">Commentaire</th>
                    <th class="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                    <tr 
                        class="hover:bg-gray-50 transition-colors"
                        v-for="clue in clueStore.listClues()"
                        :key="clue.id"
                    >
                        <td
                            class="px-6 py-4 font-medium text-gray-900"
                        >
                            {{ clue.name }}
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ clue.description }}
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ clue.mjComment }}
                        </td>

                        <td class="flex gap-6 py-4 justify-center">

                            <button
                                @click="handleEdit(clue)"
                                class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                ✏️ Modifier
                            </button>
                            <button
                                @click="handleDeleteConfirm(clue)"
                                class="bg-gradient-to-r from-rose-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                🗑️ Supprimer
                            </button>
                            <button
                                @click="duplicateItem(clue)"
                                class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                📚 Dupliquer
                            </button>
                            <button
                                @click="giveClueToAll(clue)"
                                class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                                v-show="clue.isGiven == false"
                            >
                                ✋ Donner à tous
                            </button>
                            <button
                                @click="takeClueToAll(clue)"
                                class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                                v-show="clue.isGiven == true"
                            >
                                ✊ Reprendre à tous
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal de création/édition -->
    <ClueModal
      :show="showModal"
      :clue="editingClue"
      @close="closeModal"
      @save="handleSave"
    />

    <!-- Modal de confirmation de suppression -->
    <ClueDeleteModal
      :show="showDeleteModal"
      :clue="clueToDelete"
      @close="closeDeleteModal"
      @confirm="handleDelete"
    />
</template>