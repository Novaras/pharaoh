
export type Building = {
	id: number;
	label: string;
	display?: [number, number];
};

const buildings: Building[] = [
	{
		id: 0,
		label: `House`,
	},
];

export const BUILDING_DATA = Object.freeze(buildings);