import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCampaignStore } from './campaignStore'

export const useClueStore = defineStore('clues', () => {
    const campaignStore = useCampaignStore()

    const campaignId = ref(null);

    function setCampaignId(id) {
        campaignId.value = id
    }

    const campaign = computed(() =>
        campaignStore.campaigns.find((c) => c.id === campaignId.value)
    );

    function _findClue(clueId) {
        return campaign.value.clues.find(({id}) => (id === clueId))
    }

    function _findIndexClue(clueId) {
        return campaign.value.clues.findIndex(({id}) => (id === clueId))
    }

    function listClues(){
        return campaign.value.clues;
    }

    function addClue(newClue) {
        campaign.value.clues.push({
            id: crypto.randomUUID(),
            ...newClue,
            isGiven: false,
        })
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function giveClue(clueId){
        campaign.value.players.forEach(player => {
            player.inventory.push(clueId)
        });
        const clue = _findClue(clueId)
        clue.isGiven = true;
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function duplicateClue(clueModel) {
        const {
            id,
            playerId,
            ...clueData
        } = clueModel;

        campaign.value.clues.push({
            id: crypto.randomUUID(),
            ...clueData,
        })
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function modifyClue(clueId, ClueModifiee) {
        const clue = _findClue(clueId)

        clue.name = ClueModifiee.name
        clue.text = ClueModifiee.text
        clue.mjComment = ClueModifiee.mjComment

        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function deleteClue(clueId) {
        const index = _findIndexClue(clueId)
        campaign.value.clues.splice(index, 1)

        campaign.value.players.forEach(player => {
            const indexInventory = player.inventory.findIndex((id) => (id == clueId))

            player.inventory.splice(indexInventory, 1)
        });

        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    return { listClues, addClue, modifyClue, deleteClue, duplicateClue, giveClue, setCampaignId }
})
