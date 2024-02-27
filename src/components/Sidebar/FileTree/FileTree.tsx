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
			className={`menu menu-xs w-full p-0 ${sidebarCollapsed ? "hidden" : "flex"}`}
		>
			<p className=" text-xs px-1 py-0.5 font-semibold">{folderName}</p>

			{fileTreeElements}
		</ul>
	);
}
