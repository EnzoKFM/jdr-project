<script setup>
    import { useChapterStore } from '@/stores/chapters';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const store = useChapterStore()
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Etat</th>
                <th>Description</th>
                <th>Commentaire</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="chapitre in store.listeChapitre">
                <td class="cursor-pointer hover:text-blue-600" @click="router.push({name: 'viewChapitre', params: { id: chapitre.id }})">{{ chapitre.nom }}</td>
                <td>{{ chapitre.etat }}</td>
                <td>{{ chapitre.description }}</td>
                <td>{{ chapitre.commentaire }}</td>
            </tr>
        </tbody>
    </table>
</template>