import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./main.css";
import { useInterfaceStore } from "./stores/interfaceStore";
import { useCampaignStore } from "./stores/campaignStore";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

const interfaceStore = useInterfaceStore();
const campaignStore = useCampaignStore();

interfaceStore.initFromLocalStorage();
campaignStore.initFromLocalStorage();
