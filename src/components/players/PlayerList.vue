<script setup>
	const props = defineProps({
		players: { type: Array, required: true },
	});

	const emit = defineEmits(["edit", "delete", "duplicate", "show"]);
</script>

<template>
	<div class="p-4 flex flex-col gap-y-4">
		<div class="space-y-2">
            <button
                @click="emit('show')"
                class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
            >
                <span class="text-xl">+</span>
                Nouveau Joueur
            </button>
        </div>
        <div class="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table class="w-full border-collapse bg-white text-sm text-gray-700">
                
                <thead class="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
					<tr>
						<th class="px-6 py-3 text-left font-semibold">Nom</th>
						<th class="px-6 py-3 text-left font-semibold">État</th>
						<th class="px-6 py-3 text-left font-semibold">Description</th>
						<th class="px-6 py-3 text-left font-semibold">Commentaire (MJ)</th>
						<th class="px-6 py-3 text-left font-semibold">Actions</th>
					</tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                    <tr 
                        class="hover:bg-gray-50 transition-colors"
                        v-for="p in players"
                        :key="p.id"
                    >
						<td class="px-6 py-4 text-gray-600">
                            {{ p.name || '—' }}
                        </td>
                        <td
                            class="px-6 py-4 font-medium text-gray-900"
                        >
                            <span :class="[
								'px-2 py-1 rounded-full text-xs font-semibold',
								p.state === 'vivant'
									? 'bg-emerald-600/20 text-emerald-400'
									: 'bg-red-600/20 text-red-400',
							]">
								{{ p.state }}
							</span>
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ p.description || '—' }}
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ p.comment || '—' }}
                        </td>

                        <td class="flex gap-6 py-4 justify-center">

                            <button
                                @click="emit('edit', p)"
                                class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                ✏️ Modifier
                            </button>
                            <button
                                @click="emit('delete', p)"
                                class="bg-gradient-to-r from-rose-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                🗑️ Supprimer
                            </button>
                            <button
                                @click="emit('duplicate', p)"
                                class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                📚 Dupliquer
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
