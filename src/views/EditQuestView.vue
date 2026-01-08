<script setup>
  import { useRoute, useRouter } from 'vue-router';
    import FormulaireQuete from '../components/FormQuest.vue';
    import useQuetesStore from '../stores/quest';

  const router = useRouter();
  const route = useRoute();
  console.log(route.params);
  const { questId } = route.params;

  const store = useQuetesStore();
  const quete = store.queteSpecifique(questId);

  function gererModification(nom, description, lieu, mdpActivation, mdpResolution, commentaire) {
    store.modifierQuete(questId, nom, description, lieu, mdpActivation, mdpResolution, commentaire);
    router.push({ name: 'quetes' });
  }

  function gererSuppression() {
    if (!confirm('Confirmer la suppression')) return;
    store.supprimerQuete(questId);
    router.push({ name: 'quetes' });
  }
</script>

<template>
  <h2>Modifier une quête</h2>
  <FormulaireQuete
    :quete
    @sauvegarder="gererModification" />
</template>

<style scoped>
  
</style>