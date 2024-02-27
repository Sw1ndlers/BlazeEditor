export type FileElement = {
	type: "file";
	name: string;
	extension: string;
    absolutePath: string;
};

export type FolderElement = {
	type: "folder";
	name: string;
	children: PathElement[];
    absolutePath: string;
};

export type PathElement = FileElement | FolderElement;
