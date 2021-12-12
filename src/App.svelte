<script lang="ts">
	import { selected } from "./selection";
	import MainCanvas from "./MainCanvas.svelte";
	import ControlPanel from "./ControlPanel.svelte";

	import type { LevelMap } from "./map";
	import type { Building } from "./buildings";

	export let map: LevelMap;

	console.log(map);

	let cur_selection: Building | undefined;
	selected.subscribe((value: Building) => {
		cur_selection = value;
	});
</script>

<main id="app_main">
	<div class="mb-4">Pharaoh!</div>
	<div>
		selected: <pre>{cur_selection?.label}</pre>
	</div>
	<MainCanvas {map} />
	<ControlPanel />
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
