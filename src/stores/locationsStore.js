import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCampaignStore } from './campaignStore'
import { useRoute } from 'vue-router'

export const useLocationStore = defineStore('locations', () => {
    const campaignStore = useCampaignStore()
    const route = useRoute();

    const campaignId = computed(() => route.params.id);
    const campaign = computed(() =>
        campaignStore.campaigns.find((c) => c.id === campaignId.value)
    );

    function _findLocation(itemId) {
        return campaign.value.locations.find(({id}) => (id === itemId))
    }

    function _findIndexLocation(itemId) {
        return campaign.value.locations.findIndex(({id}) => (id === itemId))
    }

    function listLocations(){
        return campaign.value.locations;
    }

    function addLocation(newLocation) {
        campaign.value.locations.push({
            id: crypto.randomUUID(),
            ...newLocation,
        })
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function duplicateLocation(locationModel) {
        const {
            id,
            ...locationData
        } = locationModel;

        campaign.value.locations.push({
            id: crypto.randomUUID(),
            ...locationData,
        })
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function modifyLocation(itemId, LocationModifiee) {
        const location = _findLocation(itemId)

        location.name = LocationModifiee.name
        location.text = LocationModifiee.text
        location.mjComment = LocationModifiee.mjComment

        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function deleteLocation(itemId) {
        const index = _findIndexLocation(itemId)
        campaign.value.locations.splice(index, 1)

        // Get all Quests + Splice

        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    return { listLocations, addLocation, modifyLocation, deleteLocation, duplicateLocation }
})
