<script setup>
    import { ref } from "vue";
    import { usePlayerStore } from "@/stores/playerStore";
    import PlayerList from "./PlayerList.vue";
    import PlayerModal from "./PlayerModal.vue";
    import PlayerDeleteModal from "./PlayerDeleteModal.vue";
    import { watchEffect  } from "vue";

    const props = defineProps({
        campaignId: {
            type: String,
            required: true,
        },
    });

    const playerStore = usePlayerStore();

    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const editedPlayer = ref(null);
    const playerToDelete = ref(null);

    const handleDeleteClick = (player) => {
        playerToDelete.value = player;
        showDeleteModal.value = true;
    };

    function handleDelete() {
        if (!playerToDelete.value) return;

        playerStore.deletePlayer(playerToDelete.value.id);

        showDeleteModal.value = false;
        playerToDelete.value = null;
    }

    function handleEdit(player) {
        editedPlayer.value = player;
        showModal.value = true;
    }

    function handleSave(playerData) {
        if (editedPlayer.value) {
            playerStore.updatePlayer(editedPlayer.value.id, playerData);
        } else {
            playerStore.addPlayer(playerData);
        }

        editedPlayer.value = null;
        showModal.value = false;
    }

    function handleDuplicate(player) {
        playerStore.duplicatePlayer(player);
    }
</script>

<template>
    <div class="space-y-6">
        <PlayerList :players="playerStore.listPlayers()" @edit="handleEdit" @delete="handleDeleteClick" @duplicate="handleDuplicate" @show="showModal = true" />

        <PlayerModal :show="showModal" :player="editedPlayer" @close="() => { showModal = false; editedPlayer = null }" @save="handleSave" />

        <PlayerDeleteModal :show="showDeleteModal" :player="playerToDelete" @close="() => { showDeleteModal = false; playerToDelete = null }" @confirm="handleDelete" />
    </div>
</template>
