import { PathElement } from "@/utils/Types/FileSystem";
import generateNodes from "./Nodes/GenerateNodes";
import useCssColor from "@/utils/Hooks/CssColor";

export default function FileTree({
	folderName,
	fileStructure,
	sidebarCollapsed,
}: {
	folderName: string;
	fileStructure: PathElement[];
	sidebarCollapsed: boolean;
}) {
	const iconColor = useCssColor("base-content");

	if (iconColor === null) {
		return;
	}

	const fileTreeElements: React.JSX.Element[] = [];

	fileStructure.forEach((element) => {
		fileTreeElements.push(generateNodes(element, iconColor));
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
