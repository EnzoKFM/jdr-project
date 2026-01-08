<script setup>
    import { ref } from "vue";
    import PlayerList from "./PlayerList.vue";
    import PlayerModal from "./PlayerModal.vue";
    import PlayerDeleteModal from "./PlayerDeleteModal.vue";

    const props = defineProps({
        campaign: { type: Object, required: true },
    });

    const emit = defineEmits(["update"]);

    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const editedPlayer = ref(null);
    const playerToDelete = ref(null);

    function handleAdd(playerData) {
        emit("update", {
            players: [
                ...props.campaign.players,
                {
                    id: crypto.randomUUID(),
                    ...playerData,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ],
        });

        showModal.value = false;
    }

    const handleDeleteClick = (player) => {
        playerToDelete.value = player;
        showDeleteModal.value = true;
    };

    function handleDelete() {
        if (!playerToDelete.value) return;

        const updatedPlayers = props.campaign.players.filter(
            p => p.id !== playerToDelete.value.id
        );

        emit('update', { players: updatedPlayers });

        // Reset
        showDeleteModal.value = false;
        playerToDelete.value = null;
    }

    function handleEdit(player) {
        editedPlayer.value = player;
        showModal.value = true;
    }

    function handleSave(playerData) {
        if (editedPlayer.value) {
            const updatedPlayers = props.campaign.players.map(p =>
            p.id === editedPlayer.value.id
                ? { ...p, ...playerData, updatedAt: new Date().toISOString() }
                : p
            );

            emit("update", { players: updatedPlayers });
        } else {
            handleAdd(playerData);
            return;
        }

        editedPlayer.value = null;
        showModal.value = false;
    }


</script>

<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">Liste des joueurs</h3>

            <button
                @click="showModal = true"
                class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition font-semibold"
            >
                + Ajouter un joueur
            </button>
        </div>

        <PlayerList :players="campaign.players" @edit="handleEdit" @delete="handleDeleteClick" />

        <PlayerModal :show="showModal" :player="editedPlayer" @close="() => { showModal = false; editedPlayer = null }" @save="handleSave" />

        <PlayerDeleteModal :show="showDeleteModal" :player="playerToDelete" @close="() => { showDeleteModal = false; playerToDelete = null }" @confirm="handleDelete" />
    </div>
</template>
