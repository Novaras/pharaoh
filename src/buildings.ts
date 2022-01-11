import type { Tile } from "./tiles";
import { TILE_DATA } from "./tiles";

export type Building = {
	id: number;
	label: string;
	tile: Tile;
};

const buildings: Building[] = [
	{
		id: 0,
		label: `House`,
		tile: TILE_DATA.HOUSE
	},
];

export const BUILDING_DATA = Object.freeze(buildings);