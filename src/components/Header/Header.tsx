import { IconBrandHtml5, IconFlame, IconX } from "@tabler/icons-react";
import FileButton from "./Buttons/FileButton";
import ActionButtons from "./Buttons/ActionButtons";
import useCssColor, { rgbaToCss } from "@/utils/Hooks/CssColor";
import { Color } from "chroma-js";
import { ReactNode, useEffect, useRef, useState } from "react";
import React from "react";
import Tabs from "./Tabs/Tabs";

export default function Header({ headerHeight }: { headerHeight: number }) {
	let iconColor: string | Color | null = useCssColor("base-content");

	if (iconColor === null) {
		return null;
	}

	iconColor = iconColor.hex();

	return (
		<div>
			<div
				data-tauri-drag-region
				className="w-full flex items-center px-2 bg-base-300"
				style={{
					// -24 for the file button container
					height: `${headerHeight - 26}px`,
				}}
			>
				<div data-tauri-drag-region className="flex items-center">
					<IconFlame data-tauri-drag-region />
				</div>

                <Tabs />

				<ActionButtons iconColor={iconColor} />
			</div>
			<div className="h-min w-full flex flex-row bg-base-100 px-0.5 pb-0.5 pt-1">
				<FileButton headerHeight={headerHeight} />
			</div>
		</div>
	);
}
