export type FileElement = {
	type: "file";
	name: string;
	extension: string;
};

export type FolderElement = {
	type: "folder";
	name: string;
	children: PathElement[];
};

export type PathElement = FileElement | FolderElement;
