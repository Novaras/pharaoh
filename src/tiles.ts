export type Tile = {
	id: number,
	label: string,
	display: [number, number]
};

const tiles: Record<string, Tile> = {
	WATER: {
		id: 0,
		label: `Water`,
		display: [0, 0]
	},
	LAND: {
		id: 1,
		label: `Land`,
		display: [0, 1]
	}
};

export const TILE_MAP_LOCATION = '../tiles.png';
export const TILE_DATA = Object.freeze(tiles);