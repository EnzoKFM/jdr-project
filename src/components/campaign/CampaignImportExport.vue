<script setup>
import { ref } from "vue";

const emit = defineEmits(["import"]);

const fileInput = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      emit("import", e.target.result);
    };
    reader.readAsText(file);

    event.target.value = "";
  }
};
</script>

<template>
  <div
    class="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200"
  >
    <div class="flex gap-4">
      <label class="flex-1">
        <input
          type="file"
          accept=".json,.cplc.json"
          @change="handleFileChange"
          class="hidden"
          ref="fileInput"
        />
        <button
          @click="$refs.fileInput.click()"
          class="w-full bg-white text-purple-700 px-4 py-2 rounded-lg border-2 border-purple-300 font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
        >
          <span class="text-xl">📥</span>
          Importer (.cplc.json)
        </button>
      </label>
    </div>
  </div>
</template>
