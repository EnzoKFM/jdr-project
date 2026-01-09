<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useCampaignStore } from "@/stores/campaignStore";
import { useInterfaceStore } from "@/stores/interfaceStore";
import CampaignList from "./CampaignList.vue";
import CampaignModal from "./CampaignModal.vue";
import CampaignDeleteModal from "./CampaignDeleteModal.vue";
import CampaignImportExport from "./CampaignImportExport.vue";

const router = useRouter();
const campaignStore = useCampaignStore();
const interfaceStore = useInterfaceStore();

// État des modals
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingCampaign = ref(null);
const campaignToDelete = ref(null);

// Création
const openCreateModal = () => {
  editingCampaign.value = null;
  showModal.value = true;
};

// Édition
const handleEdit = (campaign) => {
  editingCampaign.value = campaign;
  showModal.value = true;
};

// Sauvegarde (création ou édition)
const handleSave = (formData) => {
  if (editingCampaign.value) {
    // Mise à jour
    campaignStore.updateCampaign(editingCampaign.value.id, formData);
  } else {
    // Création
    campaignStore.createCampaign(formData);
  }
  closeModal();
};

// Fermer le modal
const closeModal = () => {
  showModal.value = false;
  editingCampaign.value = null;
};

// Activation
const handleActivate = (campaignId) => {
  campaignStore.setActiveCampaign(campaignId);
};

// Duplication
const handleDuplicate = (campaignId) => {
  campaignStore.duplicateCampaign(campaignId);
};

// Export
const handleExport = (campaignId) => {
  campaignStore.exportCampaign(campaignId);
};

// Naviguer vers la page détails de la campagne
const handleViewDetails = (campaignId) => {
  router.push({ name: 'mj-campaign-detail', params: { id: campaignId } });
};

// Suppression - Confirmation
const handleDeleteConfirm = (campaign) => {
  campaignToDelete.value = campaign;
  showDeleteModal.value = true;
};

// Suppression - Exécution
const handleDelete = () => {
  if (campaignToDelete.value) {
    campaignStore.deleteCampaign(campaignToDelete.value.id);
    closeDeleteModal();
  }
};

// Fermer le modal de suppression
const closeDeleteModal = () => {
  showDeleteModal.value = false;
  campaignToDelete.value = null;
};

// Import
const handleImport = (jsonData) => {
  const result = campaignStore.importCampaign(jsonData);
  if (result) {
    alert(`✅ Campagne "${result.name}" importée avec succès !`);
  } else {
    alert('❌ Erreur lors de l\'import. Vérifiez le format du fichier.');
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span class="text-3xl">📚</span>
        Gestion des Campagnes
      </h2>
      <button
        @click="openCreateModal"
        class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
      >
        <span class="text-xl ">+</span>
        Nouvelle Campagne
      </button>
    </div>

    <!-- Import/Export -->
    <CampaignImportExport @import="handleImport" />

    <!-- Liste des campagnes -->
    <CampaignList
      :campaigns="campaignStore.allCampaigns"
      :show-m-j-comments="interfaceStore.isMJMode"
      @activate="handleActivate"
      @edit="handleEdit"
      @duplicate="handleDuplicate"
      @export="handleExport"
      @delete="handleDeleteConfirm"
      @view-details="handleViewDetails"
    />

    <!-- Modal de création/édition -->
    <CampaignModal
      :show="showModal"
      :campaign="editingCampaign"
      @close="closeModal"
      @save="handleSave"
    />

    <!-- Modal de confirmation de suppression -->
    <CampaignDeleteModal
      :show="showDeleteModal"
      :campaign="campaignToDelete"
      @close="closeDeleteModal"
      @confirm="handleDelete"
    />
  </div>
</template>
