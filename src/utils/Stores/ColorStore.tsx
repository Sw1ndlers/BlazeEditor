import { Color } from "chroma-js";
import { produce } from "immer";
import { create } from "zustand";

interface ColorStore {
	colors: Record<string, Color>;
	getColor: (color: string) => Color | null;
	setColor: (color: string, value: Color) => void;
}

export const useColorStore = create<ColorStore>((set, get) => ({
	colors: {},

	getColor: (color: string) => {
		return get().colors[color] || null;
	},
	setColor: (color: string, value: Color) => {
		set(
			produce((state) => {
				state.colors[color] = value;
			}),
		);
	},
}));
