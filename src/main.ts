import "./app.css";
import App from "./App.svelte";
import { LevelMap } from "./map";
import { TILE_DATA } from "./tiles";

// const my_map = new LevelMap(16, Array.from({
// 	length: 16 * 16
// }, () => null));

const my_map = new LevelMap(16, Array.from({
	length: 16 * 16
}, (_, i) => {
	return Object.values(TILE_DATA)[Math.round(Math.random())];
}));

const app = new App({
	target: document.body,
	props: {
		map: my_map,
	},
});

export default app;
