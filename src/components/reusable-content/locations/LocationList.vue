<script setup>
    import { ref } from 'vue';
    import { useLocationStore } from '@/stores/locationsStore';
    import LocationModal from './LocationModal.vue';
    import LocationDeleteModal from './LocationDeleteModal.vue';

    const props = defineProps({
        campaignId : { type: String }
    })

    const locationStore = useLocationStore()

    const editingLocation = ref(null);
    const locationToDelete = ref(null);

    const showModal = ref(false);
    const showDeleteModal = ref(false);

    // Créer
    const handleCreate = () => {
        editingLocation.value = null;
        showModal.value = true;
    };

    // Editer
    const handleEdit = (location) => {
        editingLocation.value = location;
        showModal.value = true;
    };

    // Supprimer
    const handleDeleteConfirm = (location) => {
        locationToDelete.value = location;
        showDeleteModal.value = true;
    };

    // Créer/Editer - Execution
    const handleSave = (formData) => {
        if (editingLocation.value) {
            // Mise à jour
            locationStore.modifyLocation(editingLocation.value.id, formData);
        } else {
            // Création
            locationStore.addLocation(formData);
        }
        closeModal();
    };

    // Suppression - Exécution
    const handleDelete = () => {
        if (locationToDelete.value) {
            locationStore.deleteLocation(locationToDelete.value.id);
            closeDeleteModal();
        }
    };

    // Fermer le modal
    const closeModal = () => {
        editingLocation.value = null;
        showModal.value = false;
    };

    // Fermer le modal de suppression
    const closeDeleteModal = () => {
        showDeleteModal.value = false;
        locationToDelete.value = null;
    };

    const duplicateItem = (location) => {
        locationStore.duplicateLocation(location)
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
                Nouveau Lieu
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
                        v-for="location in locationStore.listLocations()"
                        :key="location.id"
                    >
                        <td
                            class="px-6 py-4 px-6 font-medium text-gray-900"
                        >
                            {{ location.name }}
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ location.description }}
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ location.mjComment }}
                        </td>

                        <td class="flex gap-6 py-4 justify-center">

                            <button
                                @click="handleEdit(location)"
                                class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                            >
                                ✏️ Modifier
                            </button>
                            <button
                                @click="handleDeleteConfirm(location)"
                                class="bg-gradient-to-r from-rose-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                            >
                                🗑️ Supprimer
                            </button>
                            <button
                                @click="duplicateItem(location)"
                                class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
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
    <LocationModal
      :show="showModal"
      :location="editingLocation"
      @close="closeModal"
      @save="handleSave"
    />

    <!-- Modal de confirmation de suppression -->
    <LocationDeleteModal
      :show="showDeleteModal"
      :item="locationToDelete"
      @close="closeDeleteModal"
      @confirm="handleDelete"
    />
</template>