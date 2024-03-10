import { create } from "zustand";
import { AbsolutePath, FileElement } from "../Types/FileSystem";
// import { readTextFile } from "@tauri-apps/api/fs";
import { invoke } from "../Functions/Tauri";

export type TabData = {
	fileElement: FileElement;
	content: string;
	modified: boolean;
	validUtf: boolean;
};

async function getTabData(fileElement: FileElement): Promise<TabData> {
	const content = await invoke<string>("read_file", {
		filePath: fileElement.absolutePath,
	});

	if (content == null) {
		return {
			fileElement: fileElement,
			content: "",
			modified: false,
			validUtf: false,
		};
	}

	return {
		fileElement: fileElement,
		content: content,
		modified: false,
		validUtf: true,
	};
}

interface TabStore {
	tabData: Record<string, TabData>;
	activeTab: TabData | null;

	setTabOpen: (path: FileElement, open: boolean) => void;
	removeTab: (path: FileElement) => void;

	setActiveTab: (path: FileElement) => void;

	setTabContent: (path: FileElement, content: string) => void;
	setTabModified: (path: FileElement, modified: boolean) => void;
}

export const useTabStore = create<TabStore>((set, get) => ({
	tabData: {},
	activeTab: null,

	setTabOpen: (fileElement: FileElement, open: boolean) => {
		set((state) => ({
			tabData: {
				...state.tabData,
				[fileElement.absolutePath]: {
					...state.tabData[fileElement.absolutePath],
					open,
				},
			},
		}));
	},

	removeTab: (fileElement: FileElement) => {
		set((state) => {
			const newTabData = { ...state.tabData };
			delete newTabData[fileElement.absolutePath];
			return {
				tabData: newTabData,
			};
		});
	},

	setActiveTab: async (fileElement: FileElement) => {
		let tabData =
			get().tabData[fileElement.absolutePath] 

        if (tabData == null) {
            tabData = await getTabData(fileElement);
            set((state) => ({
                tabData: {
                    ...state.tabData,
                    [fileElement.absolutePath]: tabData,
                },
            }));
        }

		set({ activeTab: tabData });
	},

	setTabContent: (fileElement: FileElement, content: string) => {
		set((state) => ({
			tabData: {
				...state.tabData,
				[fileElement.absolutePath]: {
					...state.tabData[fileElement.absolutePath],
					content,
				},
			},
		}));
	},

	setTabModified: (fileElement: FileElement, modified: boolean) => {
		set((state) => ({
			tabData: {
				...state.tabData,
				[fileElement.absolutePath]: {
					...state.tabData[fileElement.absolutePath],
					modified,
				},
			},
		}));
	},
}));
