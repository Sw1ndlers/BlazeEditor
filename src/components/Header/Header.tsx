import { useCssColorHex } from "@/utils/Hooks/CssColor";
import { IconFlame } from "@tabler/icons-react";
import ActionButtons from "./Buttons/ActionButtons";
import FileButton from "./Buttons/FileButton";
import Tabs from "./Tabs/Tabs";

export default function Header({ headerHeight }: { headerHeight: number }) {
	const iconColor = useCssColorHex("base-content");

	if (iconColor === null) {
		return null;
	}

	return (
		<div>
			<div
				data-tauri-drag-region
				className="flex w-full items-center bg-base-300 px-2"
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
			<div className="flex h-min w-full flex-row bg-base-100 px-0.5 pb-0.5 pt-1">
				<FileButton headerHeight={headerHeight} />
			</div>
		</div>
	);
}
