import { create } from "zustand";
import { PathElement } from "./Types/FileSystem";

// interface BearState {
// 	bears: number;
// 	increase: (by: number) => void;
// }

// const useBearStore = create<BearState>()((set) => ({
// 	bears: 0,
// 	increase: (by) => set((state) => ({ bears: state.bears + by })),
// }));

interface FileSystemStore {
	selectedFolder: string;
	fileTree: PathElement[];

	setSelectedFolder: (folder: string) => void;
}

const useFileStore = create<FileSystemStore>((set) => ({
	selectedFolder: "",
	fileTree: [],
	setSelectedFolder: (folder) => set({ selectedFolder: folder }),
}));


export default useFileStore;