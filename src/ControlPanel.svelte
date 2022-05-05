<script lang="ts">
	import { selected } from "./selection";
	import { BUILDING_DATA } from "./buildings";

	import type { Building } from "./buildings";

	const selectBuilding = (building: Building) => {
		selected.set(building);
	};
</script>

<div>
	<ul>
		{#each BUILDING_DATA as building}
			<li>
				<button
					type="button"
					class="btn"
					on:click={() => selectBuilding(building)}
				>
					{building.label}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
