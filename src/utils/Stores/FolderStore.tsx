import { create } from "zustand";
import { AbsolutePath } from "../Types/FileSystem";


type FolderData = {
	open: boolean;
	loaded: boolean;
};

// TODO: Implement isFolderLoaded and isFolderOpen into the FolderStore

interface FolderStore {
	folderData: Record<AbsolutePath, FolderData>;

	setFolderOpen: (path: AbsolutePath, open: boolean) => void;
	setFolderLoaded: (path: AbsolutePath, loaded: boolean) => void;

    isFolderLoaded: (path: AbsolutePath) => boolean;
    isFolderOpen: (path: AbsolutePath) => boolean;
}

export const useFolderStore = create<FolderStore>((set, get) => ({
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
	},

    isFolderLoaded: (path: AbsolutePath) => {
        return get().folderData[path]?.loaded || false;
    },
    isFolderOpen: (path: AbsolutePath) => {
        return get().folderData[path]?.open || false;
    },
}));
