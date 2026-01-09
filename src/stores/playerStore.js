import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCampaignStore } from './campaignStore'

export const usePlayerStore = defineStore('players', () => {
    const campaignStore = useCampaignStore()
    const campaignId = ref(null)

    function setCampaignId(id) {
        campaignId.value = id
    }; 

    const campaign = computed(() =>
        campaignStore.campaigns.find((c) => c.id === campaignId.value)
    )

    function listPlayers() {
        return campaign.value?.players ?? []
    }

    function _findPlayer(playerId) {
        return campaign.value.players.find(p => p.id === playerId)
    }

    function _findPlayerIndex(playerId) {
        return campaign.value.players.findIndex(p => p.id === playerId)
    }

    function addPlayer(playerData) {
        campaign.value.players.push({
            id: crypto.randomUUID(),
            name: playerData.name,
            state: playerData.state ?? 'vivant',
            description: playerData.description ?? '',
            comment: playerData.comment ?? '',
            inventory: []
        })

        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function updatePlayer(playerId, updates) {
        const player = _findPlayer(playerId)
        if (!player) return

        Object.assign(player, updates, {
            updatedAt: new Date().toISOString(),
        })

        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function deletePlayer(playerId) {
        const index = _findPlayerIndex(playerId)
        if (index === -1) return

        campaign.value.players.splice(index, 1)
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function duplicatePlayer(player) {
        const clone = clonePlayer(player);
        campaign.value.players.push(clone);
        campaignStore.updateCampaign(campaignId.value, campaign.value);
    }

    function clonePlayer(player) {
        return {
            id: crypto.randomUUID(),
            name: player.name,
            state: player.state,
            description: player.description,
            comment: player.comment,
            inventory: [...(player.inventory ?? [])],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    }

    function changePlayerState(playerId, state) {
        updatePlayer(playerId, { state })
    }

    return {
        setCampaignId,
        listPlayers,
        addPlayer,
        updatePlayer,
        deletePlayer,
        duplicatePlayer,
        changePlayerState
    }
})
