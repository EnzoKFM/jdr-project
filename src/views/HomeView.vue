<script setup>
import { useRouter } from "vue-router";
import { useInterfaceStore } from "@/stores/interfaceStore";

const router = useRouter();
const interfaceStore = useInterfaceStore();

const goToMJ = () => {
  interfaceStore.switchToMJ();
  router.push({ name: "mj" });
};

const goToPlayer = () => {
  interfaceStore.switchToPlayer();
  router.push({ name: "player" });
};
</script>


<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center p-4"
  >
    <div class="max-w-4xl w-full">
      
      <div class="text-center mb-12">
        <div class="text-8xl mb-6 animate-bounce">🎲</div>
        <h1 class="text-5xl font-bold text-white mb-4">
          Gestionnaire de Campagne JDR
        </h1>
        <p class="text-xl text-white/90">
          Choisissez votre interface pour commencer
        </p>
      </div>

      <!-- Cartes de sélection -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Carte MJ -->
        <div
          @click="goToMJ"
          class="bg-white rounded-2xl shadow-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
        >
          <div class="text-center">
            <div class="text-6xl mb-4">🎭</div>
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Maître du Jeu</h2>
            <p class="text-gray-600 mb-6">
              Créez et gérez vos campagnes de jeu de rôle.
            </p>
            <button
              class="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all"
            >
              Accéder au mode MJ
            </button>
          </div>
        </div>

        <!-- Carte Joueur -->
        <div
          @click="goToPlayer"
          class="bg-white rounded-2xl shadow-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
        >
          <div class="text-center">
            <div class="text-6xl mb-4">🎮</div>
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Joueur</h2>
            <p class="text-gray-600 mb-6">
              Suivez votre progression et gérez votre inventaire.
            </p>
            <button
              class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
            >
              Accéder au mode Joueur
            </button>
          </div>
        </div>
      </div>

      <!-- Mode actuel -->
      <div class="mt-12 text-center">
        <div
          class="inline-block bg-white/20 backdrop-blur-lg rounded-lg px-6 py-3"
        >
          <p class="text-white text-sm">
            Mode actuel :
            <span class="font-bold">
              {{ interfaceStore.currentModeIcon }}
              {{ interfaceStore.currentModeLabel }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


