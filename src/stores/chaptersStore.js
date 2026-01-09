import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useCampaignStore } from "./campaignStore";
import { useRoute } from "vue-router";

export const useChapterStore = defineStore("chapters", () => {
  const campaignStore = useCampaignStore();
  const route = useRoute();

  const campaignId = ref(null);

  function setCampaignId(id) {
    campaignId.value = id;
  }

  const campaign = computed(() =>
    campaignStore.campaigns.find((c) => c.id === campaignId.value)
  );

  function _findChapter(chapterId) {
    return campaign.value.chapters.find(({ id }) => id === chapterId);
  }

  function _findIndexChapter(chapterId) {
    return campaign.value.chapters.findIndex(({ id }) => id === chapterId);
  }

  function listChapters() {
    return campaign.value.chapters;
  }

  function addChapter(newChapter) {
    campaign.value.chapters.push({
      id: crypto.randomUUID(),
      ...newChapter,
      state: "Inactif",
      quests: [],
    });
    campaignStore.updateCampaign(campaignId.value, campaign.value);
  }

  function duplicateChapter(chapterModel) {
    const { id, state, quests, ...chapterData } = chapterModel;

    campaign.value.chapters.push({
      id: crypto.randomUUID(),
      ...chapterData,
      state: "Inactif",
      quests: [], // TEMPORAIRE
    });
    campaignStore.updateCampaign(campaignId.value, campaign.value);
  }

  function modifyChapter(chapterId, chapterModifiee) {
    const chapter = _findChapter(chapterId);
    console.log(chapter);

    chapter.name = chapterModifiee.name;
    chapter.description = chapterModifiee.description;
    chapter.mjComment = chapterModifiee.mjComment;
    chapter.activationMdp = chapterModifiee.activationMdp;
    chapter.resolutionMdp = chapterModifiee.resolutionMdp;

    campaignStore.updateCampaign(campaignId.value, campaign.value);
  }

  function deleteChapter(chapterId) {
    const index = _findIndexChapter(chapterId);

    campaign.value.chapters.splice(index, 1);
    campaignStore.updateCampaign(campaignId.value, campaign.value);
  }

  function modifyStateChapter(chapterId, state) {
    const chapter = _findChapter(chapterId);

    chapter.state = state;
    campaignStore.updateCampaign(campaignId.value, campaign.value);
  }

  function activeChapter(passwordActivate) {
    console.log("dans activeChapter : ", passwordActivate.value);
    const chapters = [...campaign.value.chapters];
    console.log("chapters : ", chapters);

    const chapter = chapters.find(
      (c) => c.activationMdp === passwordActivate.value
    );
    console.log("chapter trouvé : ", chapter);

    if (chapter) {
      campaign.value.chapters.find(
        (c) => c.activationMdp === passwordActivate.value
      ).state = "Actif";
      campaignStore.updateCampaign(campaignId.value, campaign.value);
      return true;
    }

    return false;
  }

  function completeChapter(passwordComplete) {
    console.log("dans completeChapter : ", passwordComplete);
    const chapters = [...campaign.value.chapters];
    console.log("chapters : ", chapters);

    const chapter = chapters.find((c) => c.resolutionMdp === passwordComplete);
    console.log("chapter trouvé : ", chapter);

    if (chapter) {
      campaign.value.chapters.find(
        (c) => c.resolutionMdp === passwordComplete
      ).state = "Terminé";
      campaignStore.updateCampaign(campaignId.value, campaign.value);
      return true;
    }

    return false;
  }

  return {
    listChapters,
    addChapter,
    modifyChapter,
    deleteChapter,
    modifyStateChapter,
    duplicateChapter,
    setCampaignId,
    activeChapter,
    completeChapter,
  };
});
