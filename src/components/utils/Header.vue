<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useInterfaceStore } from "@/stores/interfaceStore";

const router = useRouter();
const interfaceStore = useInterfaceStore();

// Icon de l'autre mode
const targetModeIcon = computed(() => (interfaceStore.isMJMode ? "🎮" : "🎭"));

// Label de l'autre mode
const targetModeLabel = computed(() =>
  interfaceStore.isMJMode ? "Joueur" : "MJ"
);

// Classes CSS du bouton selon le mode cible
const buttonClass = computed(() =>
  interfaceStore.isMJMode
    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
    : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
);

// Basculer entre les modes
const toggleMode = () => {
  if (interfaceStore.isMJMode) {
    interfaceStore.switchToPlayer();
    router.push({ name: "player" });
  } else {
    interfaceStore.switchToMJ();
    router.push({ name: "mj" });
  }
};
</script>

<template>
  <header class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        
        <RouterLink
          to="/"
          class="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <span class="text-4xl">🎲</span>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              Gestion de Campagne JDR
            </h1>
            <p class="text-sm text-gray-500">
              {{ interfaceStore.currentModeIcon }}
              {{ interfaceStore.currentModeLabel }}
            </p>
          </div>
        </RouterLink>

        <!-- Bouton de switch de mode -->
        <button
          @click="toggleMode"
          class="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer"
          :class="buttonClass"
        >
          <span class="text-xl">{{ targetModeIcon }}</span>
          <span>Passer en mode {{ targetModeLabel }}</span>
        </button>
      </div>
    </div>
  </header>
</template>
