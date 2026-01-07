<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        chapitre: { type: Object }
    })
    const emit = defineEmits(['save'])
    const chapitre = ref(props.chapitre || {})

    function gererSubmit({target: form}){
        emit('save', chapitre)
        form.reset()
    }
</script>

<template>
    <form @submit.prevent="gererSubmit" class="my-3">
        <label for="chapitreNom">Nom du chapitre : </label>
        <input class="border-2 rounded-lg px-2 py-0.5" type="text" name="chapitreNom" id="chapitreNom" v-model="chapitre.nom"><br>
        <label for="chapitreDescription">Description du chapitre : </label>
        <input class="border-2 rounded-lg px-2 py-0.5"  type="text" name="chapitreDescription" id="chapitreDescription" v-model="chapitre.description"><br>
        <label for="chapitreCommentaire">Commentaire du chapitre : </label>
        <input class="border-2 rounded-lg px-2 py-0.5"  type="text" name="chapitreCommentaire" id="chapitreCommentaire" v-model="chapitre.commentaire"><br>
        <label for="chapitreActivationMdp">Mot de passe d'activation : </label>
        <input class="border-2 rounded-lg px-2 py-0.5"  type="text" name="chapitreActivationMdp" id="chapitreActivationMdp" v-model="chapitre.activationMdp"><br>
        <label for="chapitreResolutionMdp">Mot de passe de résolution : </label>
        <input class="border-2 rounded-lg px-2 py-0.5"  type="text" name="chapitreResolutionMdp" id="chapitreResolutionMdp" multiple v-model="chapitre.resolutionMdp"><br>
        <!-- RAJOUTER LES QUETES DANS LE SELECT
         <select class="border-2 rounded-lg"  name="chapitreQuests" id="chapitreQuests" v-model="chapitre.quests">
            
        </select> -->
        <br>
        <div>
            <button class="border-1 rounded-lg py-1 px-3 cursor-pointer" type="submit">Sauvegarder</button>
        </div>
    </form>
</template>