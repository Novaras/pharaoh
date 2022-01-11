import jimp from "jimp/browser/lib/jimp";

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
		display: [1, 0]
	},
	HOUSE: {
		id: 2,
		label: `House`,
		display: [2, 0],
	}
};

export type ParsedTile = Tile & { src: string, img?: HTMLImageElement };

export const tileImgParser = (src_map: string) => {
	return async (tile: Tile): Promise<ParsedTile> => {
		const topleft = {
			x: TILE_DIM_PX * tile.display[0],
			y: TILE_DIM_PX * tile.display[1]
		};

		const parsed = (await jimp.read(src_map)).clone();
		const src = await parsed.crop(
			topleft.x + 1,
			topleft.y + 1,
			TILE_DIM_PX,
			TILE_DIM_PX
		).getBase64Async("image/png");

		return {
			...tile,
			src: src
		};
	};
}

export const TILE_MAP_LOCATION = '../tiles.png';
export const TILE_DIM_PX = 128; // px size of tiles, may change!
export const TILE_DATA = Object.freeze(tiles);