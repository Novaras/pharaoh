<script lang="ts">
	import { onMount } from "svelte";
	import * as canvasUtil from "./canvas-util";
	import { tileImgParser, TILE_DATA } from "./tiles";
	import { selected } from "./selection";

	import type { ParsedTile } from "./tiles";
	import type { LevelMap } from "./map";
	import type { Building } from "./buildings";

	export let map: LevelMap;

	let canvas: HTMLCanvasElement;
	let tilemap: HTMLImageElement;

	const tile_size = 512 / map.H; // in px

	let cur_selection: Building | undefined;
	selected.subscribe((value: Building) => {
		cur_selection = value;
	});

	let tile_types: ParsedTile[] = [];

	onMount(async () => {
		const tilemapLoaded = () => {
			tilemap.removeEventListener(`load`, tilemapLoaded);
		};
		await new Promise<void>((res) =>
			tilemap.addEventListener(`load`, () => {
				tilemapLoaded();
				res();
			})
		);

		const parseTile = tileImgParser(tilemap.src);
		tile_types = await Promise.all(
			Object.values(TILE_DATA).map((t) => parseTile(t))
		);

		console.log(tile_types);

		const ctx = canvas.getContext("2d")!;
		const clearCanvas = canvasUtil.clearAllFn(ctx);

		const render: FrameRequestCallback = (time: number) => {
			clearCanvas();

			// map draw loop
			for (const [index, tile] of map.tiles.entries()) {
				ctx.drawImage(
					tile_types.find((tt) => tt.id === tile.id)?.img!,
					tile_size * (index % map.H),
					tile_size * Math.floor(index / map.H),
					tile_size,
					tile_size
				);
			}

			setTimeout(() => requestAnimationFrame(render), 50);
		};

		requestAnimationFrame(render);
	});

	const handleCanvasClick = (ev: MouseEvent) => {
		// console.log(ev);
		// console.log(ev.clientY);

		const rect = canvas.getBoundingClientRect();
		const x = Math.floor((ev.clientX - rect.left) / tile_size);
		const y = Math.floor((ev.clientY - rect.top) / tile_size);
		const origin = Math.floor(x + map.H * y);
		const tile = map.tiles[origin];

		// console.log(x, y);
		console.log(origin);
		// console.log(tile);
		// console.log(cur_selection);

		if (cur_selection != null) {
			map.placeBuilding(cur_selection, origin);
		}
	};
</script>

<canvas
	id="main_canvas"
	bind:this={canvas}
	width="512"
	height="512"
	on:click={handleCanvasClick}
>
	Need canvas support to play Pharaoh!
</canvas>

<img bind:this={tilemap} src="./tiles.png" alt="" style="display: none" />

<!-- tile types get their 'img' property from this rendering -->
{#each tile_types as tile_type}
	<img
		src={tile_type.src}
		alt=""
		style="display: inline-block; margin-right: 5px;"
		bind:this={tile_type.img}
	/>
{/each}

<style>
	#main_canvas {
		/* width: 512px;
		height: 512px; */
		border: 2px solid red;
	}
</style>
