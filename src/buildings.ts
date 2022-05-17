import type { Tile } from "./tiles";
import { TILE_DATA } from "./tiles";

export type Building = {
	id: number;
	label: string;
	tiles: Tile[];
	tilemap?: string;
};

const buildings: Building[] = [
	{
		id: 0,
		label: `House`,
		tiles: [
			TILE_DATA.HOUSE
		]
	},
	{
		id: 1,
		label: `Wide House`,
		tiles: [
			TILE_DATA.WIDE_HOUSE_LEFT,
			TILE_DATA.WIDE_HOUSE_RIGHT
		],
		tilemap: `01`
	},
	{
		id: 2,
		label: `Road`,
		tiles: [
			TILE_DATA.ROAD_VERTICAL // just default to a vertical road
		]
	}
];

export const BUILDING_DATA = Object.freeze(buildings);