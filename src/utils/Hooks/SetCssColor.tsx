import { Color } from "chroma-js";
import { useEffect } from "react";
import { rgbaToCss } from "./CssColor";

export default function useSetCssColor(
	color: Color | null,
	variableName: string,
	elementRef: React.MutableRefObject<HTMLElement | null>,
) {
	useEffect(() => {
		if (color === null || elementRef.current === null) {
			return;
		}

		const cssColor = rgbaToCss(color.rgba());
		elementRef.current.style.setProperty(`--${variableName}`, cssColor);
	}, [color, variableName, elementRef]);
}
