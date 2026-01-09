<script setup>
import { reactive, watch, computed } from "vue";
// Besoin du playerStore

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  location: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "save"]);

const formData = reactive({
  name: "",
  description: "",
  mjComment: "",
});

const isEditing = computed(() => props.location !== null);

// Quand le modal s'ouvre avec une campagne, remplir le formulaire
watch(
  () => props.location,
  (newLocation) => {
    if (newLocation) {
      formData.name = newLocation.name;
      formData.description = newLocation.description || "";
      formData.mjComment = newLocation.mjComment || "";
    } else {
      // Réinitialiser le formulaire
      formData.name = "";
      formData.description = "";
      formData.mjComment = "";
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit("save", { ...formData });

  formData.name = "";
  formData.description = "";
  formData.mjComment = "";
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div class="p-6">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">
          {{ isEditing ? "✏️ Modifier le lieu" : "📚 Nouveau Lieu" }}
        </h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Nom -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Nom du Lieu
            </label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Ex: Maison Sacrée"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              v-model="formData.description"
              rows="3"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              placeholder="Décrivez votre lieu..."
            ></textarea>
          </div>

          <!-- Commentaire MJ -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              💬 Commentaire MJ (privé)
            </label>
            <textarea
              v-model="formData.mjComment"
              rows="3"
              class="w-full px-4 py-3 border-2 border-yellow-300 bg-yellow-50 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all resize-none"
              placeholder="Notes personnelles visibles uniquement en mode MJ..."
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">
              ⚠️ Ce commentaire ne sera visible que pour le MJ
            </p>
          </div>

          <!-- Boutons -->
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
            >
              {{ isEditing ? "Mettre à jour" : "Créer" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
