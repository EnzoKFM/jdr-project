<script setup>
    import { reactive, watch, computed } from "vue";
    // Besoin du playerStore

    const props = defineProps({
      show: {
          type: Boolean,
          default: false,
      }
    });

    const emit = defineEmits(["close", "save"]);

    const formData = reactive({
        name: "",
        description: "",
        mjComment: "",
    });

    const handleSubmit = () => {
        emit("save", formData.playerId);
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
          Donner l'Objet à un joueur
        </h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Joueur -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              💬 Joueur
            </label>
            <select 
              v-model="formData.playerId" 
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
            >
              <option v-for="player in playerStore.listPlayers" :value='player.value.id'>{{ player.name }}</option>
            </select>
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
              Attribuer l'objet
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
