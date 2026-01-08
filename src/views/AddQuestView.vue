<script setup>
import { useRouter } from 'vue-router';
import FormulaireQuete from '../components/FormQuest.vue';
import useQuetesStore from '../stores/quest';

const router = useRouter();
const store = useQuetesStore();

function gererAjout(nom, description, lieu, mdpActivation, mdpResolution, commentaire) {
  store.ajouterQuete(nom, description, lieu, mdpActivation, mdpResolution, commentaire);
  router.push({ name: 'quetes' });
}
</script>

<template>
  <h2>Ajouter une quête</h2>

  <FormulaireQuete @sauvegarder="gererAjout" />
</template>
