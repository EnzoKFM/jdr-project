<script setup>
import { useRouter } from 'vue-router';
import TableauQuetes from '../components/TableauQuest.vue';
import useQuetesStore from '../stores/quest';

const router = useRouter();
const store = useQuetesStore();

function activerMj(id) {
  store.activerQueteMj(id);
}

function activer(id) {
  store.activerQuete(id, prompt('Mot de passe d\'activation ?'));
}

function resoudre(id) {
  store.resoudreQuete(id, prompt('Mot de passe de résolution ?'));
}

function abandonner(id) {
  store.abandonnerQuete(id);
}

</script>

<template>
  <div class="header">
    <h2>Liste des quêtes</h2>

    <button @click="router.push({ name: 'ajouter-quete' })">
      + Ajouter une quête
    </button>
  </div>

    <TableauQuetes
    :liste="store.quetes"
    @activerMj="activerMj"
    @activer="activer"
    @resoudre="resoudre"
    @abandonner="abandonner"
  />
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header h2 {
  margin: 0;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  cursor: pointer;
}

button:hover {
  background-color: #eaeaea;
}
</style>

