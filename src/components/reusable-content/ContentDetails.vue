<script setup >
    import { ref } from 'vue';
    import ItemList from './items/ItemList.vue';
import ClueList from './clues/ClueList.vue';
import LocationList from './locations/LocationList.vue';
    
    // Onglet actif
    const activeTab = ref("locations");

    // Onglets disponibles
    const tabs = [
        { id: "locations", label: "Lieux", icon: "🌍" },
        { id: "items", label: "Objets", icon: "🔑" },
        { id: "clues", label: "Indices", icon: "❓" },
    ];
</script>

<template>
    <div class="border-b border-gray-200">
        <nav class="flex space-x-8 px-6">
            <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="py-4 px-1 border-b-2 font-medium text-sm transition-all"
                :class="
                    activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                "
            >
                <span class="text-lg mr-2">{{ tab.icon }}</span>
                {{ tab.label }}
            </button>
        </nav>
    </div>
    <div v-if="activeTab === 'locations'">
        <div class="text-center py-12 bg-gray-50 rounded-lg">
            <LocationList />
        </div>
    </div>
    <div v-else-if="activeTab === 'items'">
        <div class="text-center py-12 bg-gray-50 rounded-lg">
            <ItemList />
        </div>
    </div>
    <div v-else-if="activeTab === 'clues'">
        <div class="text-center py-12 bg-gray-50 rounded-lg">
            <ClueList />
        </div>
    </div>
</template>