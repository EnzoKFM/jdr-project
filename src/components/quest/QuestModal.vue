<script setup>
import { reactive, watch, computed } from "vue";

const props = defineProps({
  show: Boolean,
  quest: Object,
  chapters: Array,
  lieux: Array,
});

const emit = defineEmits(["save", "close"]);

const form = reactive({
  nom: "",
  description: "",
  lieu: "",
  motDePasseActivation: "",
  motDePasseResolution: "",
  chapterId: "",
});

const isEditing = computed(() => props.quest !== null);
// pré-remplissage édition
watch(
  () => props.quest,
  (q) => {
    if (q) {
      form.nom = q.nom;
      form.description = q.description;
      form.lieu = q.lieu;
      form.motDePasseActivation = q.motDePasseActivation;
      form.motDePasseResolution = q.motDePasseResolution;
      form.chapterId = q.chapterId;
    } else {
      form.nom = "";
      form.description = "";
      form.lieu = "";
      form.motDePasseActivation = "";
      form.motDePasseResolution = "";
      form.chapterId = "";
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit("save", { ...form });

  form.nom = "";
  form.description = "";
  form.lieu = "";
  form.motDePasseActivation = "";
  form.motDePasseResolution = "";
  form.chapterId = "";
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
          {{ isEditing ? "✏️ Modifier la quête" : "🗺️ Nouvelle quête" }}
        </h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Nom -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Nom de la quête *
            </label>
            <input
              v-model="form.nom"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Ex: Le Temple Oublié"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              placeholder="Décrivez la quête..."
            ></textarea>
          </div>

          <!-- Lieu -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              📍 Lieu
            </label>
            <select
                v-model="form.lieu"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
                <option value="" disabled>-- Sélectionner un lieu --</option>
                <option v-for="lieu in props.lieux" :key="lieu.id" :value="lieu.name">
                {{ lieu.name }}
                </option>
            </select>
          </div>
    
          <!-- Mot de passe activation -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              🔐 Mot de passe d’activation
            </label>
            <input
              v-model="form.motDePasseActivation"
              type="password"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Mot de passe d’activation"
            />
          </div>

          <!-- Mot de passe résolution -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              🏁 Mot de passe de résolution *
            </label>
            <input
              v-model="form.motDePasseResolution"
              type="password"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Mot de passe de résolution"
            />
          </div>

          <!-- Chapitre -->
            <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
                📚 Chapitre *
            </label>
            <select
                v-model="form.chapterId"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
                <option value="" disabled>-- Sélectionner un chapitre --</option>
                <option v-for="chapter in chapters" :key="chapter.id" :value="chapter.id">
                {{ chapter.name }}
                </option>
            </select>
            </div>

          <!-- Boutons -->
          <div class="flex gap-3 pt-6">
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

<style scoped>

</style>
