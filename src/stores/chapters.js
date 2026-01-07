import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useChapterStore = defineStore('chapters', () => {
    const listeChapitre = ref([])

    function _trouverChapitre(chapitreId) {
        return listeChapitre.value.find(({ id }) => (id === chapitreId));
    }

    function _trouverIDChapitre(chapitreId) {
        return listeChapitre.value.findIndex(({ id }) => (id === chapitreId));
    }

    const lireChapitre = computed(() => {
        return _trouverChapitre;
    })

    function ajoutChapitre(nouveauChapitre) {
        listeChapitre.value.push({
            id: crypto.randomUUID(),
            ...nouveauChapitre.value,
            etat: 'Inactif',
            quests: [] // TEMPORAIRE
        })
    }

    function modifierChapitre(chapitreId, chapitreModifiee) {
        const chapitre = _trouverChapitre(chapitreId)

        chapitre.name = chapitreModifiee.name
        chapitre.etat = chapitreModifiee.etat
        chapitre.description = chapitreModifiee.description
        chapitre.comment = chapitreModifiee.comment
        chapitre.activationMdp = chapitreModifiee.activationMdp
        chapitre.resolutionMdp = chapitreModifiee.resolutionMdp
        chapitre.quests = chapitreModifiee.quests
    }

    function supprimerChapitre(chapitreId) {
        const id = _trouverIDChapitre(chapitreId)

        listeChapitre.value.splice(id, 1)
    }

    function modifierEtatChapitre(chapitreId, etat) {
        const chapitre = _trouverChapitre(chapitreId)

        chapitre.etat = etat
    }

    return { listeChapitre, lireChapitre, ajoutChapitre, modifierChapitre, supprimerChapitre, modifierEtatChapitre }
})
