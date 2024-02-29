import { IconBrandRust, IconFlame, IconHtml, IconX } from "@tabler/icons-react";
import FileButton from "./Buttons/FileButton";
import ActionButtons from "./Buttons/ActionButtons";
import useCssColor from "@/utils/Hooks/CssColor";

export default function Header({ headerHeight }: { headerHeight: number }) {
	const iconColor = useCssColor("base-content");

	if (iconColor === null) {
		return null;
	}

	return (
		<div
			data-tauri-drag-region
			className="w-full flex items-center px-2 bg-base-300 py-1.5"
			style={{
				height: `${headerHeight}px`,
			}}
		>
			<div className="flex items-center">
				<IconFlame />
			</div>

			<FileButton headerHeight={headerHeight} />

			<div className="w-28 h-full bg-base-100 rounded-sm flex justify-center items-center p-2 gap-1">
				<IconHtml size={14} />

				<div>
					<p className="text-xs text-ellipsis">index.html</p>
				</div>

				<IconX className="ml-auto" size={14} />
			</div>

			<ActionButtons iconColor={iconColor} />
		</div>
	);
}
