import "./app.css";
import App from "./App.svelte";
import { LevelMap } from "./map";
import { TILE_DATA } from "./tiles";

// const my_map = new LevelMap(16, Array.from({
// 	length: 16 * 16
// }, () => null));

const map_dim = 12;

const my_map = new LevelMap(map_dim, Array.from({
	length: Math.pow(map_dim, 2)
}, (_, i) => {
	return Object.values(TILE_DATA)[Math.random() < 0.1 ? 0 : 1];
}));

const app = new App({
	target: document.body,
	props: {
		map: my_map,
	},
});

export default app;
