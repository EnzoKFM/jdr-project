import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCampaignStore } from './campaignStore'
import { useRoute } from 'vue-router'

export const useItemStore = defineStore('items', () => {
    const campaignStore = useCampaignStore()
    const route = useRoute();

    const campaignId = computed(() => route.params.id);
    const campaign = computed(() =>
        campaignStore.campaigns.find((c) => c.id === campaignId.value)
    );

    function _findItem(itemId) {
        return campaign.value.items.find(({id}) => (id === itemId))
    }

    function _findIndexItem(itemId) {
        return campaign.value.items.findIndex(({id}) => (id === itemId))
    }

    function listItems(){
        return campaign.value.items;
    }

    function addItem(newItem) {
        campaign.value.items.push({
            id: crypto.randomUUID(),
            ...newItem,
        })
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function linkItem(itemId, playerId){
        const player = campaign.value.players.find(({id}) => (id == playerId))
        player.inventory.push(itemId)
    }

    function duplicateItem(itemModel) {
        const {
            id,
            playerId,
            ...itemData
        } = itemModel;

        campaign.value.items.push({
            id: crypto.randomUUID(),
            ...itemData,
        })
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function modifyItem(itemId, ItemModifiee) {
        const item = _findItem(itemId)

        item.name = ItemModifiee.name
        item.description = ItemModifiee.description
        item.mjComment = ItemModifiee.mjComment

        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function deleteItem(itemId, playerId) {
        const index = _findIndexItem(itemId)
        campaign.value.items.splice(index, 1)

        if(playerId !== ""){
            const player = campaign.value.player.find(({id}) => (id == playerId))
            const indexInventory = player.value.inventory.findIndex(itemId)

            player.value.inventory.splice(indexInventory, 1)
        }

        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    return { listItems, addItem, modifyItem, deleteItem, duplicateItem }
})
