<script setup>
    import { ref } from 'vue';
    import { useItemStore } from '@/stores/itemsStore';
    import ItemModal from './ItemModal.vue';
    import ItemDeleteModal from './ItemDeleteModal.vue';

    const itemStore = useItemStore()

    const editingItem = ref(null);
    const itemToDelete = ref(null);

    const showModal = ref(false);
    const showDeleteModal = ref(false);

    const openCreateModal = () => {
        editingItem.value = null;
        showModal.value = true;
    };

    // Édition
    const handleEdit = (item) => {
        editingItem.value = item;
        showModal.value = true;
    };

    const handleSave = (formData) => {
        if (editingItem.value) {
            // Mise à jour
            itemStore.modifyItem(editingItem.value.id, formData);
        } else {
            // Création
            itemStore.addItem(formData);
        }
        closeModal();
    };

    // Fermer le modal
    const closeModal = () => {
        showModal.value = false;
    };

    // Suppression - Confirmation
    const handleDeleteConfirm = (item) => {
        itemToDelete.value = item;
        showDeleteModal.value = true;
    };

    // Suppression - Exécution
    const handleDelete = () => {
        if (itemToDelete.value) {
            itemStore.deleteItem(itemToDelete.value.id, ""); // A MODIFIER
            closeDeleteModal();
        }
    };

    // Fermer le modal de suppression
    const closeDeleteModal = () => {
        showDeleteModal.value = false;
        itemToDelete.value = null;
    };

    const duplicateItem = (item) => {
        itemStore.duplicateItem(item)
    }
</script>

<template>
    <div class="p-4 flex flex-col gap-y-4">
        <div class="space-y-2">
            <button
                @click="openCreateModal"
                class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
            >
                <span class="text-xl">+</span>
                Nouvelle Objet
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
                        v-for="item in itemStore.listItems()"
                        :key="item.id"
                    >
                        <td
                            class="px-6 py-4 font-medium text-gray-900"
                        >
                            {{ item.name }}
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ item.description }}
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ item.mjComment }}
                        </td>

                        <td class="flex gap-6 py-4 justify-center">

                            <button
                                @click="handleEdit(item)"
                                class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                ✏️ Modifier
                            </button>
                            <button
                                @click="handleDeleteConfirm(item)"
                                class="bg-gradient-to-r from-rose-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                🗑️ Supprimer
                            </button>
                            <button
                                @click="duplicateItem(item)"
                                class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                📚 Dupliquer
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal de création/édition -->
    <ItemModal
      :show="showModal"
      :item="editingItem"
      @close="closeModal"
      @save="handleSave"
    />

    <!-- Modal de confirmation de suppression -->
    <ItemDeleteModal
      :show="showDeleteModal"
      :item="itemToDelete"
      @close="closeDeleteModal"
      @confirm="handleDelete"
    />
</template>