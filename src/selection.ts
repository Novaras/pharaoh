import { Writable, writable } from "svelte/store";
import type { Building } from "./buildings";

export const selected: Writable<Building> = writable();