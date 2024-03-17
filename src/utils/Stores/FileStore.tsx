import { create } from "zustand";
import { PathElement } from "../Types/FileSystem";

interface FileSystemStore {
	selectedFolder: string;
	fileTree: PathElement[];

	setFileTree: (tree: PathElement[]) => void;
	setSelectedFolder: (folder: string) => void;
}

export const useFileStore = create<FileSystemStore>((set) => ({
	selectedFolder: "",
	fileTree: [],
	openedFolders: [],

	setFileTree: (tree: PathElement[]) => set({ fileTree: tree }),
	setSelectedFolder: (folder) => set({ selectedFolder: folder }),
}));
