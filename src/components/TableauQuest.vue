<script setup>
  import { useRouter } from 'vue-router';
  import useQuetesStore from '../stores/quest';

const router = useRouter();
const store = useQuetesStore();


const emit = defineEmits(['activerMj','activer', 'resoudre', 'abandonner']);
    
const { liste } = defineProps({
  liste: { type: Array, required: true },
});

function gererSuppression(questId) {
    if (!confirm('Confirmer la suppression')) return;
    store.supprimerQuete(questId);
    router.push({ name: 'quetes' });
  }

  function gererDuplication(id) {
  const queteOriginale = liste.find(q => q.id === id)
  if (!queteOriginale) return

  const nouvelleQuete = {
    ...queteOriginale,
    id: crypto.randomUUID(),
    etat: 'inactive',
  }

  liste.push(nouvelleQuete);
  router.push({ name: 'quetes' });

}

</script>

<template>
  <table class="tableau">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Description</th>
        <th>Lieu</th>
        <th>État</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="liste.length === 0">
        <td colspan="5" class="vide">Aucune quête pour le moment</td>
      </tr>

      <tr v-for="q in liste" :key="q.id">
        <td>{{ q.nom }}</td>
        <td>{{ q.description }}</td>
        <td>{{ q.lieu }}</td>
        <td>{{ q.etat }}</td>
        <td class="actions">
          <button v-if="q.etat === 'inactive'" @click="emit('activerMj', q.id)">Activer (MJ)</button> &nbsp;
          <button v-if="q.etat === 'inactive'" @click="emit('activer', q.id)">Activer (Joueur)</button> &nbsp;
          <button v-if="q.etat === 'active'" @click="emit('resoudre', q.id)">Résoudre</button> &nbsp;
          <button v-if="q.etat !== 'terminee'" @click="emit('abandonner', q.id)">Abandonner</button>
          <br />
          <button><RouterLink :to="{ name: 'modifier', params: { questId: q.id } }">Modifier</RouterLink> </button> &nbsp;
          <!-- <button  @click="emit('resoudre', q.id)">Supprimer</button> &nbsp; -->
          <button type="button" @click="gererSuppression(q.id)">Supprimer</button> &nbsp;
          <button type="button" @click="gererDuplication(q.id)">Dupliquer</button>
            
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.tableau {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.tableau th,
.tableau td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.tableau thead {
  background-color: #f5f5f5;
}

.vide {
  text-align: center;
  font-style: italic;
  color: #777;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  cursor: pointer;
}
</style>
