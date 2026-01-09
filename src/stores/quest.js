import { defineStore } from 'pinia';
import { ref } from 'vue';
import { computed } from 'vue';

const useQuetesStore = defineStore('quetes', () => {

  const quetes = ref([]);

   function initQuetes(initialQuetes = []) {
    quetes.value = initialQuetes
  }

  function trouverIndexQuete(queteId) {
    return quetes.value.findIndex(({ id }) => (id === queteId));
  }
  function trouverQuete(queteId) {
    const indexQuete = trouverIndexQuete(queteId);
    return quetes.value[indexQuete];
  }
  
  const queteSpecifique = computed(() => (trouverQuete));


  function ajouterQuete(data) {
    const newQuest = {
        id: crypto.randomUUID(),
        nom: data.nom,
        description: data.description,
        lieu: data.lieu || [],
        etat: 'inactive', // inactive | active | terminee | abandonnee
        motDePasseActivation: data.motDePasseActivation,
        motDePasseResolution: data.motDePasseResolution,
        recompenses: data.recompenses || [],
        commentaire: data.commentaire || '',
        chapterId: data.chapterId 
    };

    quetes.value.push(newQuest);
    return newQuest;
  }

  function modifierQuete(questId, updates) {
    const quete = trouverQuete(questId);

        // Mettre à jour la campagne
        quete.nom = updates.nom;
        quete.description = updates.description;
        quete.lieu = updates.lieu;
        quete.motDePasseActivation = updates.motDePasseActivation;
        quete.motDePasseResolution = updates.motDePasseResolution;
        quete.commentaire = updates.commentaire || '';
      
      return null;
  }

  function activateMjQuest(id) {
    const quete = quetes.value.find(q => q.id === id);
    if (!quete) return false;

    quete.etat = 'active';
    return true;
  }

  function activerQuete(passwordActivate) {
      const quete = quetes.value.find(
        (c) => c.motDePasseActivation === passwordActivate
      );

      if (quete) {
        quete.etat = "Actif";
        return true;
      }

      return false;
  }

  function resoudreQuete(passwordComplete) {
    const quete = quetes.value.find((c) => c.motDePasseResolution === passwordComplete);

    if (quete) {
      quete.etat = "Terminé";
      return true;
    }

    return false;
  }

  function abandonnerQuete(id) {
    const quete = quetes.value.find(q => q.id === id);
    if (quete) quete.etat = 'abandonnee';
  }

  function dupliquerQuete(id) {
  const queteOriginale = quetes.value.find(q => q.id === id)
  if (!queteOriginale) return

  const nouvelleQuete = {
    ...queteOriginale,
    id: crypto.randomUUID(),
    etat: 'inactive',
  }

    quetes.value.push(nouvelleQuete);

    return nouvelleQuete
  }

  function supprimerQuete(id) {
    const indexQuete = trouverIndexQuete(id);
    quetes.value.splice(indexQuete, 1);
  }

  return {
    quetes,
    initQuetes,
    ajouterQuete,
    activerQuete, 
    activateMjQuest,
    resoudreQuete,
    abandonnerQuete,
    modifierQuete, supprimerQuete, dupliquerQuete,
    queteSpecifique
  };
});

export default useQuetesStore;
