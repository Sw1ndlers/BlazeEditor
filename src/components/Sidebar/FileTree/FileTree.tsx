import { useCssColor } from "@/utils/Hooks/CssColor";
import { PathElement } from "@/utils/Types/FileSystem";
import { Color } from "chroma-js";
import generateNodes from "./Nodes/GenerateNodes";

export default function FileTree({
	folderName,
	fileStructure,
	sidebarCollapsed,
}: {
	folderName: string;
	fileStructure: PathElement[];
	sidebarCollapsed: boolean;
}) {
	let iconColor: string | Color | null = useCssColor("base-content");

	if (iconColor === null) {
		return;
	}

	iconColor = iconColor.hex();

	const fileTreeElements: React.JSX.Element[] = [];

	fileStructure.forEach((element) => {
		fileTreeElements.push(generateNodes(element, iconColor as string));
	});

	return (
		<ul
			className={`menu menu-xs max-h-full w-full flex-col flex-nowrap overflow-y-hidden p-0 pb-2 ${sidebarCollapsed ? "hidden" : "flex"}`}
		>
			<p className=" h-min px-1 py-0.5 text-xs font-semibold">
				{folderName}
			</p>

			<div className="h-full flex-grow overflow-y-scroll">
				{fileTreeElements}
			</div>
		</ul>
	);
}
