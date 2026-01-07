<script setup>
    import FormulaireChapitre from '@/components/chapitres/FormulaireChapitre.vue';
    import { useChapterStore } from '@/stores/chapters';
    import { useRouter } from 'vue-router';
    
    const router = useRouter()
    const store = useChapterStore()

    function gererSave(newChapter){
        store.ajoutChapitre(newChapter)
        router.push({ name: 'listeChapitre'})
    }

</script>

<template>
    <FormulaireChapitre @save="gererSave" />
</template>