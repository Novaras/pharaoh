<script lang="ts">
	import "";
	import MainCanvas from "./MainCanvas.svelte";

	import type { LevelMap } from "./map";

	export let map: LevelMap;

	console.log(map);
</script>

<main id="app_main">
	<div class="mb-4">Pharaoh!</div>
	<MainCanvas {map} />
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
