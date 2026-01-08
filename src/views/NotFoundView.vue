<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center p-4"
  >
    <div class="text-center">
      <div class="text-9xl mb-6">🎲</div>
      <h1 class="text-6xl font-bold text-white mb-4">404</h1>
      <p class="text-2xl text-white/90 mb-8">Page non trouvée</p>
      <p class="text-white/80 mb-8">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <RouterLink
        to="/"
        class="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
      >
        ← Retour à l'accueil
      </RouterLink>
    </div>
  </div>
</template>
