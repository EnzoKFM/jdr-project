<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  clue: {
    type: Object,
    default: null,
  },
});

defineEmits(["close", "confirm"]);
</script>

<template>
  <div
    v-if="show && clue"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
      <h3 class="text-xl font-bold text-red-600 mb-4">
        ⚠️ Confirmer la suppression
      </h3>
      <p class="text-gray-700 mb-6">
        Êtes-vous sûr de vouloir supprimer le chapitre
        <strong>"{{ clue.name }}"</strong> ? Cette action est irréversible.
      </p>
      <div class="flex gap-3">
        <button
          @click="$emit('close')"
          class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
        >
          Annuler
        </button>
        <button
          @click="$emit('confirm')"
          class="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>
