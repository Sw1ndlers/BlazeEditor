import { create } from "zustand";
import { FolderElement, PathElement } from "./Types/FileSystem";

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

type AbsolutePath = string;
type FolderData = {
	open: boolean;
	loaded: boolean;
};

interface FolderStore {
	folderData: Record<AbsolutePath, FolderData>;

    setFolderOpen: (path: AbsolutePath, open: boolean) => void;
    setFolderLoaded: (path: AbsolutePath, loaded: boolean) => void;
}

export const useFolderStore = create<FolderStore>((set) => ({
	folderData: {},

    setFolderOpen: (path: AbsolutePath, open: boolean) => {
        set((state) => ({
            folderData: {
                ...state.folderData,
                [path]: {
                    ...state.folderData[path],
                    open,
                },
            },
        }));
    },
    setFolderLoaded: (path: AbsolutePath, loaded: boolean) => {
        set((state) => ({
            folderData: {
                ...state.folderData,
                [path]: {
                    ...state.folderData[path],
                    loaded,
                },
            },
        }));
    }
}));
