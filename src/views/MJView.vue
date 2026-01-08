<script setup>
import Header from "@/components/utils/Header.vue";
import Footer from "@/components/utils/Footer.vue";
import CampaignManager from "@/components/campaign/CampaignManager.vue";
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex flex-col"
  >
    <Header />

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <CampaignManager />
    </main>

    <Footer />
  </div>
</template>
