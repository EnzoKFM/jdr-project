<script setup>
    import FormulaireChapitre from '@/components/chapitres/FormulaireChapitre.vue';
    import { useChapterStore } from '@/stores/chapters';
    import { useRoute } from 'vue-router';
    import { useRouter } from 'vue-router';

    const store = useChapterStore()
    const route = useRoute()
    const router = useRouter()

    const { id } = route.params
    const chapitre = store.lireChapitre(id)

    function gererSave(newChapitre){
        store.modifierChapitre(id, newChapitre)
    }

    function modifierEtatChapitre(etat){
        if (!confirm(`Voulez-vous vraiment modifier l'état du chapitre ?`)) return;
        store.modifierEtatChapitre(id, etat)
    }

    function supprimerChapitre(){
        if(!confirm('Voulez-vous vraiment supprimer le chapitre ?')) return;
        store.supprimerChapitre(id)
        router.push({name: 'listeChapitre'})
    }

    function activerChapitre(){
        const input = prompt("Rentrez le mot de passe")

        if(input !== chapitre.activationMdp){
            alert("Mot de passe incorrect")
        } else {
            store.modifierEtatChapitre(id, 'Activé')
        }
    }

    function terminerChapitre(){
        const input = prompt("Rentrez le mot de passe")

        if(input !== chapitre.resolutionMdp){
            alert("Mot de passe incorrect")
        } else {
            store.modifierEtatChapitre(id, 'Terminé')
        }
    }
</script>

<template>
    <div class="my-3">
        <h2>{{ chapitre.name }}</h2>
        <p>Etat : {{ chapitre.etat }}</p>
        <p>Description : {{ chapitre.description }}</p>
        <p>Commentaire : {{ chapitre.comment }}</p><br>
        <div class="gap-y-3">
            <div class="flex gap-3">
                <button class="border-1 rounded-lg py-1 px-3 cursor-pointer text-blue-500" @click="modifierEtatChapitre('Activé')">Activer</button>
                <button class="border-1 rounded-lg py-1 px-3 cursor-pointer text-green-500" @click="modifierEtatChapitre('Terminé')">Terminer</button>
            </div>
            <button class="border-1 rounded-lg py-1 px-3 cursor-pointer text-red-500" @click="supprimerChapitre">Supprimer</button>
        </div>
        <div>
            <div class="flex gap-3">
                <button class="border-1 rounded-lg py-1 px-3 cursor-pointer text-blue-500" @click="activerChapitre" v-show="chapitre.etat == 'Inactif'">Activer</button>
                <button class="border-1 rounded-lg py-1 px-3 cursor-pointer text-green-500" @click="terminerChapitre" v-show="chapitre.etat == 'Activé'">Terminer</button>
            </div>
        </div>
    </div>
    <hr>
    <FormulaireChapitre :chapitre="chapitre" @save="gererSave" />
</template>