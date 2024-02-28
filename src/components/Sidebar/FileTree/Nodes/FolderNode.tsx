import { useFileStore } from "@/utils/Stores/FileStore";
import { useFolderStore } from "@/utils/Stores/FolderStore";
import { FolderElement, PathElement } from "@/utils/Types/FileSystem";
import { IconFolder, IconFolderFilled } from "@tabler/icons-react";
import { invoke } from "@/utils/Functions/Tauri";
import generateNodes from "./GenerateNodes";

export default function FolderNode({
	folderElement,
	iconColor,
}: {
	folderElement: FolderElement;
	iconColor: string;
}) {
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
		console.log("isOpen", isOpen);
		setFolderOpen(folderElement.absolutePath, !isOpen);
	}

	async function onClick(folderElement: FolderElement) {
		if (isFolderLoaded(folderElement.absolutePath) == false) {
			const newTree: PathElement[] = await invoke("populate_folder", {
				originalTree: fileTree,
				folderPath: folderElement.absolutePath,
			});

			setFileTree(newTree);
			setFolderLoaded(folderElement.absolutePath, true);
		}

		// Fixes issues with the folder not closing
		await new Promise((resolve) => setTimeout(resolve, 0));

		toggleOpen(folderElement);
	}

	return (
		<li>
			<details open={isFolderOpen(folderElement.absolutePath)}>
				<summary onClick={() => onClick(folderElement)}>
					{isFolderOpen(folderElement.absolutePath) ? (
						<IconFolder
							size={15}
							color={iconColor}
							className="-mr-1"
						/>
					) : (
						<IconFolderFilled
							size={15}
							color={iconColor}
							className="-mr-1"
						/>
					)}

					<p className="text-ellipsis overflow-hidden text-nowrap">
						{folderElement.name}
					</p>
				</summary>
				<ul>
					{folderElement.children.map((element, index) => {
						return generateNodes(element, iconColor);
					})}
				</ul>
			</details>
		</li>
	);
}
