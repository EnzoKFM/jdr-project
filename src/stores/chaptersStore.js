import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCampaignStore } from './campaignStore'
import { useRoute } from 'vue-router'

export const useChapterStore = defineStore('chapters', () => {
    const campaignStore = useCampaignStore()
    const route = useRoute();

    const campaignId = ref(null);

    function setCampaignId(id) {
        campaignId.value = id;
    }; 

    const campaign = computed(() =>
        campaignStore.campaigns.find((c) => c.id === campaignId.value)
    );

    function _findChapter(chapterId) {
        return campaign.value.chapters.find(({ id }) => (id === chapterId));
    }

    function _findIndexChapter(chapterId) {
        return campaign.value.chapters.findIndex(({ id }) => (id === chapterId));
    }

    function listChapters(){
        return campaign.value.chapters
    }

    function addChapter(newChapter) {
        campaign.value.chapters.push({
            id: crypto.randomUUID(),
            ...newChapter,
            state: 'Inactif',
            quests: []
        })
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function duplicateChapter(chapterModel) {
        const {
            id,
            state,
            quests,
            ...chapterData
        } = chapterModel;

        campaign.value.chapters.push({
            id: crypto.randomUUID(),
            ...chapterData,
            state: 'Inactif',
            quests: [] // TEMPORAIRE
        })
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function modifyChapter(chapterId, chapterModifiee) {
        const chapter = _findChapter(chapterId)
        console.log(chapter)

        chapter.name = chapterModifiee.name
        chapter.description = chapterModifiee.description
        chapter.mjComment = chapterModifiee.mjComment
        chapter.activationMdp = chapterModifiee.activationMdp
        chapter.resolutionMdp = chapterModifiee.resolutionMdp

        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function deleteChapter(chapterId) {
        const index = _findIndexChapter(chapterId)

        campaign.value.chapters.splice(index, 1)
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function modifyStateChapter(chapterId, state) {
        const chapter = _findChapter(chapterId)

        chapter.state = state
        campaignStore.updateCampaign(campaignId.value, campaign.value)
    }

    function addQuestToChapter(chapterId, newQuest) {
        const chapter = _findChapter(chapterId);
        if (!chapter.quests) chapter.quests = [];
        chapter.quests.push(newQuest);
        campaignStore.updateCampaign(campaignId.value, campaign.value);
    }

    function removeQuestFromChapter(chapterId, questId) {
        const chapter = _findChapter(chapterId);
        if (!chapter) return;

        chapter.quests = chapter.quests.filter(q => q.id !== questId);

        campaignStore.updateCampaign(campaignId.value, campaign.value);
    }

    // Mettre à jour (ou déplacer) une quête dans les chapitres
    function updateQuestInChapter(targetChapterId, questId, updates) {
        // chercher la quête dans l'ensemble des chapitres
        let currentChapter = campaign.value.chapters.find(ch => ch.quests && ch.quests.some(q => q.id === questId));

        // si trouvée, mettre à jour / retirer
        if (currentChapter) {
            const index = currentChapter.quests.findIndex(q => q.id === questId);
            if (index !== -1) {
                const updatedQuest = { ...currentChapter.quests[index], ...updates };

                if (currentChapter.id === targetChapterId) {
                    // mise à jour sur place
                    currentChapter.quests[index] = updatedQuest;
                } else {
                    // déplacer vers un autre chapitre
                    currentChapter.quests.splice(index, 1);
                    const target = _findChapter(targetChapterId);
                    if (!target.quests) target.quests = [];
                    target.quests.push(updatedQuest);
                }

                campaignStore.updateCampaign(campaignId.value, campaign.value);
                return true;
            }
        } else {
            // si pas trouvée, ajouter dans le chapitre cible
            const target = _findChapter(targetChapterId);
            if (!target) return false;
            if (!target.quests) target.quests = [];
            target.quests.push({ id: questId, ...updates });
            campaignStore.updateCampaign(campaignId.value, campaign.value);
            return true;
        }

        return false;
    }

    return { listChapters, addChapter, modifyChapter, deleteChapter, modifyStateChapter, duplicateChapter, addQuestToChapter, removeQuestFromChapter, updateQuestInChapter, setCampaignId }
})
