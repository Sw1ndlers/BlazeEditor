import { create } from "zustand";

type AbsolutePath = string;
type FolderData = {
	open: boolean;
	loaded: boolean;
};

// TODO: Implement isFolderLoaded and isFolderOpen into the FolderStore

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
	},
}));
