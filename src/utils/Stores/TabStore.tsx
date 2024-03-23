import { produce } from "immer";
import { create } from "zustand";
import { invoke } from "../Functions/Tauri";
import { FileElement } from "../Types/FileSystem";

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

	setActiveTab: (fileElement: FileElement | null) => void;

	setTabContent: (fileElement: FileElement, content: string) => void;
	setTabModified: (fileElement: FileElement, modified: boolean) => void;

	setTabOrder: (fileElement: FileElement, order: number | null) => void;
}

export const useTabStore = create<TabStore>((set, get) => ({
	tabList: {},
	activeTab: null,

	setTabOpen: (fileElement: FileElement, open: boolean) => {
		set(
			produce((state) => {
				state.tabList[fileElement.absolutePath].open = open;
			}),
		);
	},

	removeTab: (fileElement: FileElement) => {
        console.log(`Before: ${JSON.stringify(get().tabList)}`)
		set((state) => {
			const newTabData = { ...state.tabList };

			delete newTabData[fileElement.absolutePath];

			return {
				tabList: newTabData,
			};
		});
        console.log(`After: ${JSON.stringify(get().tabList)}`)
	},

	setActiveTab: async (fileElement: FileElement | null) => {
        if (fileElement == null) {
            set({ activeTab: null });
            return;
        }

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
		set(
			produce((state) => {
				state.tabList[fileElement.absolutePath].content = content;
			}),
		);
	},

	setTabModified: (fileElement: FileElement, modified: boolean) => {
		set(
			produce((state) => {
				state.tabList[fileElement.absolutePath].modified = modified;
			}),
		);
	},

	// Breaks if it is with immer due to readonly error
	setTabOrder: (fileElement: FileElement, order: number | null) => {
        
            
		set((state) => ({
			tabList: {
				...state.tabList,
				[fileElement.absolutePath]: {
					...state.tabList[fileElement.absolutePath],
					order: order,
				},
			},
		}));
	},
}));
