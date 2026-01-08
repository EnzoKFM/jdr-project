import { defineStore } from 'pinia';
import { ref } from 'vue';
import { computed } from 'vue';

const useQuetesStore = defineStore('quetes', () => {

  const quetes = ref([]);

  function trouverIndexQuete(queteId) {
    return quetes.value.findIndex(({ id }) => (id === queteId));
  }
  function trouverQuete(queteId) {
    const indexQuete = trouverIndexQuete(queteId);
    return quetes.value[indexQuete];
  }
    const queteSpecifique = computed(() => (trouverQuete));

  // function ajouterQuete(nom, description, lieu, mdpActivation, mdpResolution, commentaire) {
  //   quetes.value.push({
  //     id: crypto.randomUUID(),
  //     nom,
  //     description,
  //     lieu,

  //     etat: 'inactive', // inactive | active | terminee | abandonnee

  //     motDePasseActivation: mdpActivation,
  //     motDePasseResolution: mdpResolution,

  //     recompenses: [],
  //     commentaire: commentaire || '',
  //   });
  // }
  function ajouterQuete(data) {
    quetes.value.push({
      id: crypto.randomUUID(),
      nom: data.nom,
      description: data.description,
      lieu: data.lieu,
      etat: 'inactive', // inactive | active | terminee | abandonnee
      motDePasseActivation: data.motDePasseActivation,
      motDePasseResolution: data.motDePasseResolution,
      recompenses: data.recompenses || [],
      commentaire: data.commentaire || '',
    });
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

  function activerQueteMj(id) {
    const quete = quetes.value.find(q => q.id === id);
    if (!quete) return false;

    quete.etat = 'active';
    return true;
  }

  function activerQuete(id, motDePasse) {
    const quete = quetes.value.find(q => q.id === id);
    if (!quete) return false;

    if (quete.motDePasseActivation && quete.motDePasseActivation !== motDePasse) {
      return false;
    }

    quete.etat = 'active';
    return true;
  }

  function resoudreQuete(id, motDePasse) {
    const quete = quetes.value.find(q => q.id === id);
    if (!quete) return false;

    if (quete.motDePasseResolution !== motDePasse) return false;

    quete.etat = 'terminee';
    return quete.recompenses;
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
}

  function supprimerQuete(id) {
    const indexQuete = trouverIndexQuete(id);
    quetes.value.splice(indexQuete, 1);
  }

  return {
    quetes,
    ajouterQuete,
    activerQuete, activerQueteMj,
    resoudreQuete,
    abandonnerQuete,
    queteSpecifique, modifierQuete, supprimerQuete, dupliquerQuete
  };
});

export default useQuetesStore;
