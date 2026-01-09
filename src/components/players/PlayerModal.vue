<script setup>
    import { reactive, watch, computed } from "vue";

    const props = defineProps({
        show: {
            type: Boolean,
            default: false,
        },
        player: {
            type: Object,
            default: null,
        },
    });

    const emit = defineEmits(["close", "save"]);

    const formData = reactive({
        name: "",
        state: "vivant",
        description: "",
        comment: ""
    });

    const isEditing = computed(() => props.player !== null);

    watch(
        () => props.player,
        (newPlayer) => {
            if (newPlayer) {
                formData.name = newPlayer.name;
                formData.state = newPlayer.state;
                formData.description = newPlayer.description || "";
                formData.comment = newPlayer.comment || "";
            } else {
                formData.name = "";
                formData.state = "vivant";
                formData.description = "";
                formData.comment = "";
            }
        },
        { immediate: true }
    );

    const handleSubmit = () => {
        emit("save", { ...formData });
        formData.name = "";
        formData.state = "vivant";
        formData.description = "";
        formData.comment = "";
    };
</script>

<template>
    <div v-if="show" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="$emit('close')">
        <div class="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-6">
                    {{ isEditing ? "✏️ Modifier le joueur" : "👤 Nouveau joueur" }}
                </h3>

                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Nom du personnage
                        </label>
                        <input
                            v-model="formData.name"
                            type="text"
                            required
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            placeholder="Ex: Empereur Enzo"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            État
                        </label>
                        <select
                            v-model="formData.state"
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        >
                            <option value="vivant">🟢 Vivant</option>
                            <option value="mort">🔴 Mort</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            v-model="formData.description"
                            rows="3"
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                            placeholder="Classe, apparence, traits notables..."
                        >
                        </textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Commentaire (MJ)
                        </label>
                        <textarea
                            v-model="formData.comment"
                            rows="3"
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                            placeholder="Commentaire..."
                        >
                        </textarea>
                    </div>

                    <div class="flex gap-3 pt-4">
                        <button
                            type="button"
                            @click="$emit('close')"
                            class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            class="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
                        >
                            {{ isEditing ? "Mettre à jour" : "Ajouter" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
