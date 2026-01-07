<script setup>

</script>

<template>
    <h1 class="text-3xl font-bold">Exemple Chapitre</h1><br>
    <nav class="flex gap-2 mb-4">
        <RouterLink class="border-1 rounded-lg py-1 px-3 cursor-pointer" :to="{ name: 'listeChapitre'}">Liste des Chapitres</RouterLink>
        <RouterLink class="border-1 rounded-lg py-1 px-3 cursor-pointer" :to="{ name: 'ajoutChapitre'}">Ajouter un Chapitre</RouterLink>
    </nav>
    <hr>
    <RouterView />
</template>