import {
	PathElement,
	FileElement,
	FolderElement,
} from "@/utils/Types/FileSystem";
import { IconFileTypePdf, IconFolder } from "@tabler/icons-react";

function generateNodes(pathElement: PathElement) {
    const key = Math.random().toString(36).substring(7);

	if (pathElement.type === "file") {
		return generateFileNode(pathElement, key);
	} else {
		return generateFolderNode(pathElement, key);
	}
}

function generateFileNode(fileElement: FileElement, key: string) {
	return (
		<li key={key}>
			<a>
				<IconFileTypePdf size={14} className="-mr-1" />
				<p className="text-ellipsis overflow-hidden text-nowrap">
					{fileElement.name}.{fileElement.extension}
				</p>
			</a>
		</li>
	);
}

function generateFolderNode(folderElement: FolderElement, key: string) {
	return (
		<li key={key}>
			<details open>
				<summary className=" ">
					<IconFolder size={14} className="-mr-1" />
					<p className="text-ellipsis overflow-hidden text-nowrap">
						{folderElement.name}
					</p>
				</summary>
				<ul>
					{folderElement.children.map((element, index) => {
						return generateNodes(element);
					})}
				</ul>
			</details>
		</li>
	);
}

export default function FileTree({
	folderName,
	fileStructure,
	sidebarCollapsed,
}: {
	folderName: string;
	fileStructure: PathElement[];
	sidebarCollapsed: boolean;
}) {
	const fileTreeElements: React.JSX.Element[] = [];

	fileStructure.forEach((element) => {
		fileTreeElements.push(generateNodes(element));
	});

	return (
		<ul
			className={`menu menu-xs w-full p-0 ${sidebarCollapsed ? "hidden" : "flex"}`}
		>
			<p className=" text-xs px-1 py-0.5 font-semibold">{folderName}</p>

			{/* {fileTreeElements} */}
            {fileTreeElements}
		</ul>
	);
}
