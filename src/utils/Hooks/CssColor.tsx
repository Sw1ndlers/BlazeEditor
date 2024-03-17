import chroma from "chroma-js";
import { useEffect, useState } from "react";
import { splitOklchString } from "../Functions/Colors";
import { useColorStore } from "../Stores/ColorStore";

export function rgbaToCss(rgba: number[]) {
	return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
}

export function useCssColor(colorInput: string) {
	const [colorValue, setColorValue] = useState<chroma.Color | null>(null);

	useEffect(() => {
		const sampleDiv = document.createElement("div");
		sampleDiv.classList.add("bg-" + colorInput);
		document.body.appendChild(sampleDiv);

		const backgroundStyles = getComputedStyle(sampleDiv);
		const backgroundColor: string =
			backgroundStyles.getPropertyValue("background-color");

		const backgroundOklch = splitOklchString(backgroundColor);
		const outputColor = chroma.oklch(...backgroundOklch);

		document.body.removeChild(sampleDiv);

		setGlobalColor(colorInput, outputColor);
		setColorValue(outputColor);

		return () => {
			if (sampleDiv.parentElement !== null) {
				document.body.removeChild(sampleDiv);
			}
		};
	}, []);

	const getGlobalColor = useColorStore((state) => state.getColor);
	const setGlobalColor = useColorStore((state) => state.setColor);

	const globalColor = getGlobalColor(colorInput);
	if (globalColor !== null) {
		return globalColor;
	}

	return colorValue;
}

type Hex = string;

export function useCssColorHex(colorInput: Hex) {
	const [colorValue, setColorValue] = useState<chroma.Color | null>(null);

	useEffect(() => {
		const sampleDiv = document.createElement("div");
		sampleDiv.classList.add("bg-" + colorInput);
		document.body.appendChild(sampleDiv);

		const backgroundStyles = getComputedStyle(sampleDiv);
		const backgroundColor: string =
			backgroundStyles.getPropertyValue("background-color");

		const backgroundOklch = splitOklchString(backgroundColor);
		const outputColor = chroma.oklch(...backgroundOklch);

		document.body.removeChild(sampleDiv);

		setGlobalColor(colorInput + "-hex", outputColor);
		setColorValue(outputColor);

		return () => {
			if (sampleDiv.parentElement !== null) {
				document.body.removeChild(sampleDiv);
			}
		};
	}, []);

	const getGlobalColor = useColorStore((state) => state.getColor);
	const setGlobalColor = useColorStore((state) => state.setColor);

	const globalColor = getGlobalColor(colorInput);
	if (globalColor !== null) {
		return globalColor.hex();
	}

	return (colorValue && colorValue.hex()) || null;
}
