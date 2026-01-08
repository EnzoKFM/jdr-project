import { defineStore } from "pinia";

export const useInterfaceStore = defineStore("interface", {
  state: () => ({
    // 'MJ' ou 'JOUEUR'
    currentMode: "JOUEUR",
  }),

  getters: {
    isMJMode: (state) => state.currentMode === "MJ",

    isPlayerMode: (state) => state.currentMode === "JOUEUR",

    currentModeLabel: (state) => {
      return state.currentMode === "MJ" ? "Maître du Jeu" : "Joueur";
    },

    currentModeIcon: (state) => {
      return state.currentMode === "MJ" ? "🎭" : "🎮";
    },
  },

  actions: {
    initFromLocalStorage() {
      const savedMode = localStorage.getItem("jdr_interface");

      // Si un mode est sauvegardé et valide, on l'utilise
      if (savedMode === "MJ" || savedMode === "JOUEUR") {
        this.currentMode = savedMode;
      } else {
        this.currentMode = "JOUEUR";
        this.saveToLocalStorage();
      }
    },

    saveToLocalStorage() {
      localStorage.setItem("jdr_interface", this.currentMode);
    },

    switchToMJ() {
      this.currentMode = "MJ";
      this.saveToLocalStorage();
    },

    switchToPlayer() {
      this.currentMode = "JOUEUR";
      this.saveToLocalStorage();
    },
  },
});
