import { useState, useEffect, useRef } from "react";
import { splitOklchString } from "../Functions/Colors";
import chroma from "chroma-js";

export default function useCssColor(color: string) {
	console.log(color);
	const [hexColor, setHexColor] = useState<string | null>(null);

	useEffect(() => {
		const sampleDiv = document.createElement("div");
		sampleDiv.classList.add("bg-" + color);
		document.body.appendChild(sampleDiv);

		const backgroundStyles = getComputedStyle(sampleDiv);
		const backgroundColor: string =
			backgroundStyles.getPropertyValue("background-color");

		const backgroundOklch = splitOklchString(backgroundColor);
		const backgroundHex = chroma.oklch(...backgroundOklch).hex();

		console.log(backgroundHex);

		document.body.removeChild(sampleDiv);

		setHexColor(backgroundHex);
	}, []);

	return hexColor;
}
