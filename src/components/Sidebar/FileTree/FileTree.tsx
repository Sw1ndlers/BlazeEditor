import {
	PathElement,
	FileElement,
	FolderElement,
} from "@/utils/Types/FileSystem";
import { IconFileTypePdf, IconFolder } from "@tabler/icons-react";
import { invoke } from "@tauri-apps/api";
import { useFileStore, useFolderStore } from "@/utils/Store";
import { useRef, useState } from "react";

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
					{fileElement.name}
				</p>
			</a>
		</li>
	);
}

function FolderNode({ folderElement }: { folderElement: FolderElement }) {
	// const [fileTree, setFileTree] = useFileStore((state) => [
	// 	state.fileTree,
	// 	state.setFileTree,
	// ]);
	const fileTree = useFileStore((state) => state.fileTree);
	const setFileTree = useFileStore((state) => state.setFileTree);

	const folderData = useFolderStore((state) => state.folderData);
	const setFolderOpen = useFolderStore((state) => state.setFolderOpen);
	const setFolderLoaded = useFolderStore((state) => state.setFolderLoaded);

	function isFolderOpen(path: string) {
		const open = folderData[path]?.open;
		if (open == undefined) {
			return false;
		}
		return open;
	}

	function isFolderLoaded(path: string) {
		const loaded = folderData[path]?.loaded;
		if (loaded == undefined) {
			return false;
		}
		return loaded;
	}

	function toggleOpen(folderElement: FolderElement) {
		const isOpen = isFolderOpen(folderElement.absolutePath);
		setFolderOpen(folderElement.absolutePath, !isOpen);
	}

	async function onClick(folderElement: FolderElement) {
		if (isFolderLoaded(folderElement.absolutePath) == false) {
			console.log("Populating folder: ", folderElement.absolutePath);
            console.log("Current tree: ", fileTree.length, " elements")

			const newTree: PathElement[] = await invoke("populate_folder", {
				originalTree: fileTree,
				folderPath: folderElement.absolutePath,
			});

            console.log("Populated folder: ", folderElement.absolutePath, " with ", newTree.length, " elements")

			setFileTree(newTree);
			setFolderLoaded(folderElement.absolutePath, true);
		}

		// console.log("Toggling ", folderElement.absolutePath, " to ", !isFolderOpen(folderElement.absolutePath));
		toggleOpen(folderElement);

		// addLoadedFolder(folderElement);
	}

	return (
		<li>
			<details open={isFolderOpen(folderElement.absolutePath)}>
				<summary onClick={() => onClick(folderElement)}>
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

function generateFolderNode(folderElement: FolderElement, key: string) {
	// const [setFileTree] = useFileStore((state) => [state.setFileTree]);

	// function onClick() {
	//     console.log("folder clicked");
	// }

	// return (
	// 	<li key={key}>
	// 		<details > {/* <details open> for default open */}
	// 			<summary className=" ">
	// 				<IconFolder size={14} className="-mr-1" />
	// 				<p className="text-ellipsis overflow-hidden text-nowrap">
	// 					{folderElement.name}
	// 				</p>
	// 			</summary>
	// 			<ul>
	// 				{folderElement.children.map((element, index) => {
	// 					return generateNodes(element);
	// 				})}
	// 			</ul>
	// 		</details>
	// 	</li>
	// );
	return <FolderNode folderElement={folderElement} key={key} />;
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
