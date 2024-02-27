import { IconFlame } from "@tabler/icons-react";
import FileButton from "./Buttons/FileButton";
import ActionButtons from "./Buttons/ActionButtons";
import useCssColor from "@/utils/Hooks/CssColor";

export default function Header({ headerHeight }: { headerHeight: number }) {
	const iconColor = useCssColor("base-content");

	if (iconColor === null) {
		return null;
	}

	// console.log(iconColor);

	return (
		<div
			data-tauri-drag-region
			className="w-full flex items-center px-2 bg-base-300"
			style={{
				height: `${headerHeight}px`,
			}}
		>
			<div className="flex items-center">
				<IconFlame />
			</div>

			<FileButton headerHeight={headerHeight} />
			<ActionButtons iconColor={iconColor} />
		</div>
	);
}
