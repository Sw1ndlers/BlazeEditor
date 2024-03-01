import { useState, useEffect } from "react";
import { splitOklchString } from "../Functions/Colors";
import chroma from "chroma-js";
import { useColorStore } from "../Stores/ColorStore";

export function rgbaToCss(rgba: number[]) {
    return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
}

export default function useCssColor(
	color: string,
) {
	const [colorValue, setColorValue] = useState<chroma.Color | null>(null);

	useEffect(() => {
		const sampleDiv = document.createElement("div");
		sampleDiv.classList.add("bg-" + color);
		document.body.appendChild(sampleDiv);

		const backgroundStyles = getComputedStyle(sampleDiv);
		const backgroundColor: string =
			backgroundStyles.getPropertyValue("background-color");

		const backgroundOklch = splitOklchString(backgroundColor);
		const outputColor = chroma.oklch(...backgroundOklch)

		document.body.removeChild(sampleDiv);

        setColor(color, outputColor);
		setColorValue(outputColor);

        return () => {
            if (sampleDiv.parentElement !== null) {

                document.body.removeChild(sampleDiv);
            }
        };
	}, []);

    const getColor = useColorStore((state) => state.getColor);
    const setColor = useColorStore((state) => state.setColor);

    const globalColor = getColor(color);
    if (globalColor !== null) {
        return globalColor;
    }

	return colorValue;
}
