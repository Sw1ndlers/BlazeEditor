import {
	FileElement,
	FolderElement,
	PathElement,
} from "@/utils/Types/FileSystem";
import FileNode from "./FileNode";
import FolderNode from "./FolderNode";

export default function generateNodes(
	pathElement: PathElement,
	iconColor: string,
) {
	const key = Math.random().toString(36).substring(7);

	if (pathElement.type === "file") {
		return (
			<FileNode
				fileElement={pathElement as FileElement}
				iconColor={iconColor}
				key={key}
			/>
		);
	} else {
		return (
			<FolderNode
				folderElement={pathElement as FolderElement}
				iconColor={iconColor}
				key={key}
			/>
		);
	}
}
