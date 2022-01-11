<script lang="ts">
	import { onMount } from "svelte";
	import * as canvasUtil from "./canvas-util";
	import { tileImgParser, TILE_DATA } from "./tiles";
	import { selected } from "./selection";
	import map_img from "./tiles.png";

	console.log(map_img);

	import type { ParsedTile } from "./tiles";
	import type { LevelMap } from "./map";
	import type { Building } from "./buildings";

	export let map: LevelMap;

	let canvas: HTMLCanvasElement;
	let tilemap: HTMLImageElement;
	let tilemap_n: HTMLImageElement;

	const tile_size = 512 / map.H; // in px

	let cur_selection: Building | undefined;
	selected.subscribe((value: Building) => {
		cur_selection = value;
	});

	let tile_types: ParsedTile[] = [];

	onMount(async () => {
		console.log(tile_types);

		const parseTile = tileImgParser(tilemap.src);
		tile_types = await Promise.all(
			Object.values(TILE_DATA).map((t) => parseTile(t))
		);

		const ctx = canvas.getContext("2d")!;
		const clearCanvas = canvasUtil.clearAllFn(ctx);

		const render: FrameRequestCallback = (time: number) => {
			clearCanvas();

			// map draw loop
			// for each tile of map tiles, draw the tile's image which is stored in an <img> el
			// which is referenced by the `img` prop of the tiles (if it exists yet)
			for (const [index, tile] of map.tiles.entries()) {
				ctx.drawImage(
					tile_types.find((tt) => tt.id === tile.id)?.img!,
					tile_size * (index % map.H),
					tile_size * Math.floor(index / map.H),
					32,
					32
				);
			}

			setTimeout(() => requestAnimationFrame(render), 50);
		};

		requestAnimationFrame(render);
	});

	const handleCanvasClick = (ev: MouseEvent) => {
		console.log(ev);
		console.log(ev.clientY);

		const rect = canvas.getBoundingClientRect();
		const x = Math.floor((ev.clientX - rect.left) / tile_size);
		const y = Math.floor((ev.clientY - rect.top) / tile_size);
		const tile = map.tiles[Math.floor(x + map.H * y)];

		console.log(x, y);
		console.log(Math.floor(x + map.H * y));
		console.log(tile);
		console.log(cur_selection);

		// we have a selection and the target is not water
		if (cur_selection !== undefined && tile.id !== 0) {
			console.log(
				`place ${cur_selection.label} at ${Math.floor(x + map.H * y)}`
			);
			map.tiles[Math.floor(x + map.H * y)] = cur_selection.tile;
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

<img bind:this={tilemap} src={map_img} alt="" style="display: none" />
<img bind:this={tilemap_n} alt="" style="display: none" />

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
