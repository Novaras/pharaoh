import jimp from "jimp/browser/lib/jimp";

export type Tile = {
	id: number,
	label: string,
	display: [number, number],
	tags?: TILE_TAGS[]
};

export enum TILE_TAGS {
	CANNOT_BUILD_ON = `can't build on`, // assumed
	CAN_BUILD_ON = `can build on`,
	ROAD = `road`
}

const tiles = {
	WATER: {
		id: 0,
		label: `Water`,
		display: [0, 0],
	},
	LAND: {
		id: 1,
		label: `Land`,
		display: [1, 0],
		tags: [
			TILE_TAGS.CAN_BUILD_ON
		]
	},
	HOUSE: {
		id: 2,
		label: `House`,
		display: [2, 0],
	},
	WIDE_HOUSE_LEFT: {
		id: 3,
		label: `Wide house left`,
		display: [3, 0]
	},
	WIDE_HOUSE_RIGHT: {
		id: 4,
		label: `Wide house right`,
		display: [4, 0]
	},
	ROAD_VERTICAL: {
		id: 5,
		label: `Road (vertical)`,
		display: [5, 0],
		tags: [TILE_TAGS.ROAD]
	},
	ROAD_HORIZONTAL: {
		id: 6,
		label: `Road (horizontal)`,
		display: [6, 0],
		tags: [TILE_TAGS.ROAD]
	},
	ROAD_CROSS: {
		id: 7,
		label: `Road (cross)`,
		display: [7, 0],
		tags: [TILE_TAGS.ROAD]
	}
} as const;

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
export const TILE_DATA = Object.freeze(tiles as unknown as { [key in keyof typeof tiles]: Tile }) as Readonly<{ [key in keyof typeof tiles]: Tile }>;