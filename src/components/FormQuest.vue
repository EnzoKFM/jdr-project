<script setup>

const {
    quete,
  } = defineProps({
    quete: { type: Object, default: {} },
  });

const emit = defineEmits(['sauvegarder']);

function gererSubmit({ target: f }) {
  const nom = f.nom.value;
  const description = f.description.value;
  const lieu = f.lieu.value;
  const mdpActivation = f.mdpActivation.value || null;
  const mdpResolution = f.mdpResolution.value;

  emit('sauvegarder', nom, description, lieu, mdpActivation, mdpResolution);
}
</script>

<template>
  <form class="formulaire" @submit.prevent="gererSubmit">
    <div class="champ">
      <label for="nom">Nom</label>
      <input type="text" name="nom" id="nom" required :value="quete.nom" />
    </div>

    <div class="champ">
      <label for="description">Description</label>
      <textarea name="description" id="description" required :value="quete.description"></textarea>
    </div>

    <!-- --a remplacer plus tard par un select avec les lieux dispos-- -->
    <div class="champ">
      <label for="lieu">Lieu</label>
      <input type="text" name="lieu" id="lieu" required :value="quete.lieu" />
    </div>

    <div class="champ">
      <label for="mdpActivation">Mot de passe d’activation</label>
      <input type="text" name="mdpActivation" id="mdpActivation" :value="quete.motDePasseActivation"/>
    </div>

    <div class="champ">
      <label for="mdpResolution">Mot de passe de résolution</label>
      <input type="text" name="mdpResolution" id="mdpResolution" required :value="quete.motDePasseResolution"/>
    </div>

    <div class="champ">
      <label for="commentaire">Commentaire</label>
      <textarea name="commentaire" id="commentaire" :value="quete.commentaire"></textarea>
    </div>

    <!-- --a remplacer plus tard par un select avec les récompenses dispos-- -->
    <div class="champ">
      <label for="recompenses">Récompenses</label>
      <input type="text" name="recompenses" id="recompenses" :value="quete.recompenses" />
    </div>

    <button type="submit">Sauvegarder</button>
  </form>
</template>

<style scoped>
.formulaire {
  max-width: 500px;
  margin-top: 1rem;
}

.champ {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
}

.champ label {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.champ input,
.champ textarea {
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
