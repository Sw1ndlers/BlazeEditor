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
	const [fileTree, setFileTree] = useFileStore((state) => [
		state.fileTree,
		state.setFileTree,
	]);

	const [setFolderOpen, setFolderLoaded, isFolderLoaded, isFolderOpen] =
		useFolderStore((state) => [
			state.setFolderOpen,
			state.setFolderLoaded,
			state.isFolderLoaded,
			state.isFolderOpen,
		]);

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
