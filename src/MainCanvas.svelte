<script lang="ts">
	import { onMount } from "svelte";
	import * as canvasUtil from "./canvas-util";

	import type { LevelMap } from "./map";

	export let map: LevelMap;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext("2d")!;
		const clearCanvas = canvasUtil.clearAllFn(ctx);

		const tile_size = 512 / map.H; // in px

		const render: FrameRequestCallback = (time: number) => {
			clearCanvas();

			for (const [index, tile] of map.tiles.entries()) {
				// x = n % H;	x' = Sx
				// y = floor(n / H);	y' = Sy
				if (tile.id === 0) {
					ctx.fillStyle = `lightblue`;
				} else {
					ctx.fillStyle = `gold`;
				}

				ctx.fillRect(
					tile_size * (index % map.H),
					tile_size * Math.floor(index / map.H),
					tile_size,
					tile_size
				);

				ctx.font = `8px consolas`;
				ctx.strokeText(
					index.toString(),
					tile_size * (index % map.H),
					tile_size * Math.floor(index / map.H) + 8
				);
			}

			// requestAnimationFrame(render);
		};

		let frame = requestAnimationFrame(render);
	});
</script>

<canvas id="main_canvas" bind:this={canvas} width="512" height="512">
	Need canvas support to play Pharaoh!
</canvas>

<style>
	#main_canvas {
		/* width: 512px;
		height: 512px; */
		border: 2px solid red;
	}
</style>
