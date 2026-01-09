import { defineStore } from "pinia";

export const useCampaignStore = defineStore("campaign", {
  state: () => ({
    campaigns: [],
    activeCampaignId: null, // ID de la campagne active
  }),

  getters: {
    // Retourne toutes les campagnes
    allCampaigns: (state) => state.campaigns,

    // Retourne la campagne active
    activeCampaign: (state) => {
      return (
        state.campaigns.find((c) => c.id === state.activeCampaignId) || null
      );
    },

    // Compte le nombre de campagnes
    campaignsCount: (state) => state.campaigns.length,

    // Vérifie si une campagne existe par ID
    campaignExists: (state) => (id) => {
      return state.campaigns.some((c) => c.id === id);
    },
  },

  actions: {
    // Initialise les campagnes depuis le localStorage
    initFromLocalStorage() {
      try {
        const savedCampaigns = localStorage.getItem("jdr_campaigns");
        const savedActiveCampaignId = localStorage.getItem(
          "jdr_active_campaign"
        );

        if (savedCampaigns) {
          this.campaigns = JSON.parse(savedCampaigns);
        }

        if (savedActiveCampaignId) {
          this.activeCampaignId = savedActiveCampaignId;
        }
      } catch (error) {
        console.error("Erreur lors du chargement des campagnes:", error);
        this.campaigns = [];
        this.activeCampaignId = null;
      }
    },

    /**
     * Sauvegarde les campagnes dans le localStorage
     */
    saveToLocalStorage() {
      try {
        localStorage.setItem("jdr_campaigns", JSON.stringify(this.campaigns));
        if (this.activeCampaignId) {
          localStorage.setItem("jdr_active_campaign", this.activeCampaignId);
        } else {
          localStorage.removeItem("jdr_active_campaign");
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des campagnes:", error);
      }
    },

    // Génère un ID unique pour une campagne
    generateId() {
      return `campaign_${crypto.randomUUID()}`;
    },

    // Crée une nouvelle campagne
    createCampaign(campaignData) {
      const status = campaignData.status || "brouillon";

      // Si on crée une campagne active, désactiver l'ancienne
      if (status === "active") {
        if (this.activeCampaignId) {
          const oldActiveIndex = this.campaigns.findIndex(
            (c) => c.id === this.activeCampaignId
          );
          if (oldActiveIndex !== -1) {
            this.campaigns[oldActiveIndex].status = "disponible";
            this.campaigns[oldActiveIndex].updatedAt = new Date().toISOString();
          }
        }
      }

      const newCampaign = {
        id: this.generateId(),
        name: campaignData.name || "Nouvelle Campagne",
        status: status,
        description: campaignData.description || "",
        mjComment: campaignData.mjComment || "",
        players: campaignData.players || [],
        chapters: campaignData.chapters || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [],
        clues: [],
        locations: [],
      };

      // Si la campagne est active, mettre à jour activeCampaignId
      if (newCampaign.status === "active") {
        this.activeCampaignId = newCampaign.id;
      }

      this.campaigns.push(newCampaign);
      this.saveToLocalStorage();

      return newCampaign;
    },

    // Met à jour une campagne existante
    updateCampaign(campaignId, updates) {
      const index = this.campaigns.findIndex((c) => c.id === campaignId);

      if (index !== -1) {
        // Si on met le status à 'active', désactiver l'ancienne
        if (updates.status === "active") {
          // Désactiver l'ancienne campagne active (sauf si c'est la même)
          if (this.activeCampaignId && this.activeCampaignId !== campaignId) {
            const oldActiveIndex = this.campaigns.findIndex(
              (c) => c.id === this.activeCampaignId
            );
            if (oldActiveIndex !== -1) {
              this.campaigns[oldActiveIndex].status = "disponible";
              this.campaigns[oldActiveIndex].updatedAt =
                new Date().toISOString();
            }
          }
          // Mettre à jour l'ID de la campagne active
          this.activeCampaignId = campaignId;
        } else {
          this.activeCampaignId = null;
        }

        // Mettre à jour la campagne
        this.campaigns[index] = {
          ...this.campaigns[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        this.saveToLocalStorage();
        return this.campaigns[index];
      }

      return null;
    },

    // Définit une campagne comme active
    setActiveCampaign(campaignId) {
      if (this.campaignExists(campaignId)) {
        // Mettre l'ancienne campagne active en "disponible"
        if (this.activeCampaignId) {
          this.updateCampaign(this.activeCampaignId, { status: "disponible" });
        }

        // Activer la nouvelle campagne
        this.activeCampaignId = campaignId;
        this.updateCampaign(campaignId, { status: "active" });
        this.saveToLocalStorage();

        return true;
      }

      return false;
    },

    // Duplique une campagne
    duplicateCampaign(campaignId) {
      const campaign = this.campaigns.find((c) => c.id === campaignId);

      if (campaign) {
        const duplicatedCampaign = {
          ...JSON.parse(JSON.stringify(campaign)), // Deep clone
          id: this.generateId(),
          name: `${campaign.name} (Copie)`,
          status: "brouillon",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        this.campaigns.push(duplicatedCampaign);
        this.saveToLocalStorage();

        return duplicatedCampaign;
      }

      return null;
    },

    // Supprime une campagne
    deleteCampaign(campaignId) {
      const index = this.campaigns.findIndex((c) => c.id === campaignId);

      if (index !== -1) {
        // Si c'est la campagne active, la désactiver
        if (this.activeCampaignId === campaignId) {
          this.activeCampaignId = null;
        }

        this.campaigns.splice(index, 1);
        this.saveToLocalStorage();

        return true;
      }

      return false;
    },

    // Réorganise les chapitres d'une campagne
    reorderChapters(campaignId, newChaptersOrder) {
      const campaign = this.campaigns.find((c) => c.id === campaignId);

      if (campaign) {
        campaign.chapters = newChaptersOrder;
        campaign.updatedAt = new Date().toISOString();
        this.saveToLocalStorage();
        return true;
      }

      return false;
    },

    // Exporte une campagne au format JSON
    exportCampaign(campaignId) {
      const campaign = this.campaigns.find((c) => c.id === campaignId);

      if (campaign) {
        const exportData = {
          version: "1.0",
          exportDate: new Date().toISOString(),
          campaign: campaign,
        };

        const jsonString = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        // Télécharger le fichier
        const link = document.createElement("a");
        link.href = url;
        link.download = `${campaign.name.replace(/\s+/g, "_")}.cplc.json`;
        link.click();

        URL.revokeObjectURL(url);
        return true;
      }

      return false;
    },

    // Importe une campagne depuis un fichier JSON
    importCampaign(jsonData) {
      try {
        const data =
          typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;

        if (!data.campaign) {
          throw new Error("Format de fichier invalide");
        }

        // Créer une nouvelle campagne avec les données importées
        const importedCampaign = {
          ...data.campaign,
          id: this.generateId(), // Nouveau ID pour éviter les conflits
          status: "brouillon", // Toujours en brouillon à l'import
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        this.campaigns.push(importedCampaign);
        this.saveToLocalStorage();

        return importedCampaign;
      } catch (error) {
        console.error("Erreur lors de l'import:", error);
        return null;
      }
    },
  },
});
