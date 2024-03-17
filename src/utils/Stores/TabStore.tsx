import { create } from "zustand";
import { FileElement } from "../Types/FileSystem";
// import { readTextFile } from "@tauri-apps/api/fs";
import { invoke } from "../Functions/Tauri";

export type TabData = {
	fileElement: FileElement;
	content: string;
	modified: boolean;
	validUtf: boolean;
	order: number | null;
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
			order: null,
		};
	}

	return {
		fileElement: fileElement,
		content: content,
		modified: false,
		validUtf: true,
		order: null,
	};
}

interface TabStore {
	tabList: Record<string, TabData>;
	activeTab: TabData | null;

	setTabOpen: (fileElement: FileElement, open: boolean) => void;
	removeTab: (fileElement: FileElement) => void;

	setActiveTab: (fileElement: FileElement) => void;

	setTabContent: (fileElement: FileElement, content: string) => void;
	setTabModified: (fileElement: FileElement, modified: boolean) => void;

	setTabOrder: (fileElement: FileElement, order: number) => void;
	sortTabs: () => void;
}

export const useTabStore = create<TabStore>((set, get) => ({
	tabList: {},
	activeTab: null,

	setTabOpen: (fileElement: FileElement, open: boolean) => {
		set((state) => ({
			tabList: {
				...state.tabList,
				[fileElement.absolutePath]: {
					...state.tabList[fileElement.absolutePath],
					open,
				},
			},
		}));
	},

	removeTab: (fileElement: FileElement) => {
		set((state) => {
			const newTabData = { ...state.tabList };
			delete newTabData[fileElement.absolutePath];
			return {
				tabList: newTabData,
			};
		});
	},

	setActiveTab: async (fileElement: FileElement) => {
		let tabData = get().tabList[fileElement.absolutePath];

		if (tabData == null) {
			tabData = await getTabData(fileElement);
			set((state) => ({
				tabList: {
					...state.tabList,
					[fileElement.absolutePath]: tabData,
				},
			}));
		}

		set({ activeTab: tabData });
	},

	setTabContent: (fileElement: FileElement, content: string) => {
		set((state) => ({
			tabList: {
				...state.tabList,
				[fileElement.absolutePath]: {
					...state.tabList[fileElement.absolutePath],
					content,
				},
			},
		}));
	},

	setTabModified: (fileElement: FileElement, modified: boolean) => {
		set((state) => ({
			tabList: {
				...state.tabList,
				[fileElement.absolutePath]: {
					...state.tabList[fileElement.absolutePath],
					modified,
				},
			},
		}));
	},

	setTabOrder: (fileElement: FileElement, order: number) => {
		console.log(`Setting order of ${fileElement.name} to ${order}`);

		set((state) => ({
			tabList: {
				...state.tabList,
				[fileElement.absolutePath]: {
					...state.tabList[fileElement.absolutePath],
					order,
				},
			},
		}));
	},
	sortTabs: () => {
		set((state) => {
			const newTabList = { ...state.tabList };
			const sortedTabs = Object.values(newTabList).sort(
				(a, b) => a.order! - b.order!,
			);

			const newTabListSorted: Record<string, TabData> = {};

			sortedTabs.forEach((tab, index) => {
				newTabListSorted[tab.fileElement.absolutePath] = {
					...tab,
					order: index,
				};
			});

			return {
				tabList: newTabListSorted,
			};
		});
	},
}));
