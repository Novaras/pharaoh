import { Tile, TILE_DATA } from "./tiles";

export class LevelMap {
	readonly H: number; // horizontal dimension size
	readonly V: number; // vertical dimension size

	readonly tiles: Tile[]; // tile data associated with each map tile position

	get n() {
		return this.tiles.length;
	}

	constructor(H: number, tiles: (Tile | null)[]) {
		this.H = Math.max(0, H);
		this.V = tiles.length / this.H;

		this.tiles = tiles.map(tile => tile ?? TILE_DATA.WATER);
	}
};