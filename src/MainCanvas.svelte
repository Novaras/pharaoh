<script lang="ts">
	import { onMount } from "svelte";
	import * as canvasUtil from "./canvas-util";

	import type { LevelMap } from "./map";

	export let map: LevelMap;

	let canvas: HTMLCanvasElement;

	const tile_size = 512 / map.H; // in px

	onMount(() => {
		const ctx = canvas.getContext("2d")!;
		const clearCanvas = canvasUtil.clearAllFn(ctx);

		const render: FrameRequestCallback = (time: number) => {
			clearCanvas();

			for (const [index, tile] of map.tiles.entries()) {
				if (tile.id === 0) {
					ctx.fillStyle = `lightblue`;
				} else {
					ctx.fillStyle = `gold`;
				}

				// x = n % H;	x' = Sx
				// y = floor(n / H);	y' = Sy
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

			setTimeout(() => requestAnimationFrame(render), 50);
		};

		let frame = requestAnimationFrame(render);
	});

	const foo = (ev: MouseEvent) => {
		console.log(ev);

		const x = Math.floor(ev.clientX / tile_size);
		const y = Math.floor((ev.clientY - 50) / tile_size);
		const tile = map.tiles[Math.floor(x + map.H * y)];

		console.log(x, y);
		console.log(Math.floor(x + map.H * y));
		console.log(tile);
	};
</script>

<canvas
	id="main_canvas"
	bind:this={canvas}
	width="512"
	height="512"
	on:click={foo}
>
	Need canvas support to play Pharaoh!
</canvas>

<style>
	#main_canvas {
		/* width: 512px;
		height: 512px; */
		border: 2px solid red;
	}
</style>
