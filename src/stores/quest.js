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

  function ajouterQuete(nom, description, lieu, mdpActivation, mdpResolution, commentaire) {
    quetes.value.push({
      id: crypto.randomUUID(),
      nom,
      description,
      lieu,

      etat: 'inactive', // inactive | active | terminee | abandonnee

      motDePasseActivation: mdpActivation,
      motDePasseResolution: mdpResolution,

      recompenses: [],
      commentaire: commentaire || '',
    });
  }

  function modifierQuete(queteId, nom, description, lieu, mdpActivation, mdpResolution, commentaire) {
    const quete = trouverQuete(queteId);
    quete.nom = nom;
    quete.description = description;
    quete.lieu = lieu;
    quete.motDePasseActivation = mdpActivation;
    quete.motDePasseResolution = mdpResolution;
    quete.commentaire = commentaire || '';
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
    queteSpecifique, modifierQuete, supprimerQuete,
  };
});

export default useQuetesStore;
