import { PathElement } from "@/utils/Types/FileSystem";
import generateNodes from "./Nodes/GenerateNodes";
import useCssColor from "@/utils/Hooks/CssColor";
import { Color } from "chroma-js";

export default function FileTree({
	folderName,
	fileStructure,
	sidebarCollapsed,
}: {
	folderName: string;
	fileStructure: PathElement[];
	sidebarCollapsed: boolean;
}) {
	let iconColor: string | Color | null = useCssColor("base-content")

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
			className={`menu menu-xs w-full max-h-full p-0 flex-col flex-nowrap pb-2 overflow-y-hidden ${sidebarCollapsed ? "hidden" : "flex"}`}
		>
			<p className=" text-xs px-1 py-0.5 font-semibold h-min">
				{folderName}
			</p>

			<div className="flex-grow h-full overflow-y-scroll">
				{fileTreeElements}
			</div>
		</ul>
	);
}
