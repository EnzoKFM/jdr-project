<script setup>
	const props = defineProps({
		players: { type: Array, required: true },
	});

	const emit = defineEmits(["edit", "delete", "duplicate"]);
</script>

<template>
	<div class="overflow-x-auto">
		<table class="min-w-full border border-slate-700 rounded-lg overflow-hidden">
			<thead class="bg-slate-800">
				<tr>
					<th class="px-4 py-3 text-left text-sm font-medium text-slate-300">
						Nom
					</th>
					<th class="px-4 py-3 text-left text-sm font-medium text-slate-300">
						État
					</th>
					<th class="px-4 py-3 text-left text-sm font-medium text-slate-300">
						Description
					</th>
					<th class="px-4 py-3 text-left text-sm font-medium text-slate-300">
						Commentaire (MJ)
					</th>
					<th class="px-4 py-3 text-right text-sm font-medium text-slate-300">
						Actions
					</th>
				</tr>
			</thead>

			<tbody class="divide-y divide-slate-700 bg-slate-900 text-slate-300">
				<tr v-for="p in players" :key="p.id" class="hover:bg-slate-800 transition">
					<td class="px-4 py-3 font-medium">
						{{ p.name }}
					</td>

					<td class="px-4 py-3">
						<span :class="[
							'px-2 py-1 rounded-full text-xs font-semibold',
							p.state === 'vivant'
								? 'bg-emerald-600/20 text-emerald-400'
								: 'bg-red-600/20 text-red-400',
						]">
							{{ p.state }}
						</span>
					</td>

					<td class="px-4 py-3">
						{{ p.description || '—' }}
					</td>

					<td class="px-4 py-3">
						{{ p.comment || '—' }}
					</td>

					<td class="px-4 py-3 text-right flex justify-end gap-2">
						<button
							@click="emit('duplicate', p)"
							class="px-2 py-1 rounded-md bg-slate-700/60 text-slate-300 hover:bg-slate-600 hover:text-white transition text-xs"
							title="Dupliquer"
						>
							⧉
						</button>
						<button
							@click="emit('edit', p)"
							class="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full hover:bg-indigo-500 transition"
						>
							✎
						</button>
						<button
							@click="emit('delete', p)"
							class="bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-500 transition"
						>
							🗑
						</button>
					</td>
				</tr>

				<tr v-if="players.length === 0">
					<td colspan="5" class="px-4 py-6 text-center text-slate-400">
						Aucun joueur pour le moment
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
