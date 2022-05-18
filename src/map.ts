import { Building, BUILDING_DATA } from "./buildings";
import { Tile, TILE_DATA, TILE_TAGS } from "./tiles";

export type alignment = `horizontal` | `vertical`;

export class LevelMap {
	readonly H: number; // horizontal dimension size
	readonly V: number; // vertical dimension size

	readonly tiles: Tile[]; // tile data associated with each map tile position

	get n() {
		return this.tiles.length;
	}

	constructor(H: number, tiles: Tile[]) {
		this.H = Math.max(0, H);
		this.V = tiles.length / this.H;

		this.tiles = tiles.map(tile => tile ?? TILE_DATA.WATER);
	}

	getTilesAdjacentTo(tile_index: number, options = { include_diagonals: true }) {
		const tiles = [];
		const origin = Math.max(tile_index - 1 - this.H, 0);
		for (let v = 0; v < 3; ++v) {
			for (let h = 0; h < 3; ++h) {
				// if both indexes are max or 0, it's a corner so we should leave it out
				if (!options.include_diagonals && [v, h].every(index => [2, 0].includes(index))) {
					continue;
				}

				const other_index = origin + (h + (this.H * v));
				if (other_index !== tile_index && this.tiles[other_index]) {
					tiles.push({
						index: other_index,
						tile: this.tiles[other_index]
					});
				}
			}
		}
		return tiles;
	}

	indexesAreAligned(direction: alignment, ...indexes: number[]) {
		switch (direction) {
			case `horizontal`:
				return indexes.every(index => Math.floor(index / this.H) === Math.floor(indexes[0] / this.H));
			case `vertical`:
				return indexes.every(index => index % this.H === indexes[0] % this.H);
		}
	}

	private orientRoad(the_road: Building, origin: number): Building {
		the_road = { ...the_road };
		const adjacent_roads = this
			.getTilesAdjacentTo(origin, { include_diagonals: false })
			.filter(({ tile, index }) => {
				console.log(index, tile);
				return tile.tags?.includes(TILE_TAGS.ROAD)
			});
		const [any_horizontal, any_vertical] = ([`horizontal`, `vertical`] as alignment[])
			.map(dir => adjacent_roads.filter(road => this.indexesAreAligned(dir, origin, road.index)).length > 0);

		if (any_horizontal) {
			console.log(`horizontal neighbors..`);
			if (any_vertical) {
				console.log(`vertical neighbors..`);
				the_road.tiles = [TILE_DATA.ROAD_CROSS];
			} else {
				console.log(`no verts`);
				the_road.tiles = [TILE_DATA.ROAD_HORIZONTAL];
			}
		}

		return the_road;
	}

	reorientRoadsAround(origin: number) {
		this.getTilesAdjacentTo(origin, { include_diagonals: false })
			.filter(({ tile }) => tile.tags?.includes(TILE_TAGS.ROAD))
			.forEach(({ index }) => this.tiles[index] = this.orientRoad(BUILDING_DATA.find(building => building.id === 2)!, index).tiles[0]);
	}

	placeBuilding(selection: Building, origin: number) {
		// special case for roads, which need to be re-oriented to adjoin nearby road tiles
		const is_road = selection.tiles[0].tags?.includes(TILE_TAGS.ROAD);
		if (is_road) {
			console.log(`road initial: ${selection.tiles[0].label}`);
			selection = this.orientRoad(selection, origin);
			console.log(`orientation: ${selection.tiles[0].label}`);
		}

		const t_map_lines = selection.tilemap?.split(/[\n\r]/) ?? ["0"];
		// the indexes on the map this tilemap is trying to occupy
		const tilemap_indexes = (() => {
			const indexes = [];
			for (let i = 0; i < t_map_lines.length; ++i) {
				for (let j = 0; j < t_map_lines[i].length; ++j) {
					indexes.push({
						target: origin + j + i * this.H,
						tile: selection.tiles[parseInt(t_map_lines[i][j])],
					});
				}
			}
			return indexes;
		})();
		const can_place = tilemap_indexes.every(
			({ target }) => this.tiles[target].id === 1
		); // all tiles need to be sand
		// console.log(tilemap_indexes);
		if (can_place) {
			// console.log(`can place!`);

			// actually place the tiles:
			for (const index of tilemap_indexes) {
				console.log(
					`assigning tile ${index.target} as ${index.tile.label}`
				);
				this.tiles[index.target] = index.tile;
				// console.log(this.tiles);
			}

			// after placing a road, we probably need to re-orient the adjacent roads
			if (is_road) {
				this.reorientRoadsAround(origin);
			}
		}
	}
}
