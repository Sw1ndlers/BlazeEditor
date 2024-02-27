import { useRef, useState } from "react";
import { useClickOutside } from "@/utils/Hooks/ClickOutside";
import { useFileStore } from "@/utils/Stores/FileStore";
import { open } from "@tauri-apps/api/dialog";
// import { invoke } from "@tauri-apps/api/tauri";
import { invoke } from "@/utils/Functions/Tauri";
import { PathElement } from "@/utils/Types/FileSystem";

function MenuItem({
	title,
	keybind,
	callback,
	compact,
}: {
	title: string;
	keybind: string;
	callback: () => void;
	compact: boolean;
}) {
	const kbdStyle = compact ? "kbd-xs" : "kbd";

	const keybindSplit = keybind.split("+");
	const keybinds = keybindSplit.map((key, index) => {
		const lastIndex = keybindSplit.length - 1;
		const addSign = index != lastIndex ? " +" : "";

		// Little janky because for some reason the space only works on the left side
		return (
			// Thats why margin-right is being added
			<div key={index} onClick={callback} className="mr-1">
				<kbd className={kbdStyle}>{key}</kbd>
				<a>{addSign}</a>
			</div>
		);
	});

	return (
		<tr className="hover:bg-base-300 select-none" onClick={callback}>
			<td className="rounded-l-md">{title}</td>
			<td className="rounded-md flex flex-row">
				<div className="flex ml-auto">{keybinds}</div>
			</td>
		</tr>
	);
}

function OpenFolder({ compact }: { compact: boolean }) {
	// const setFileTree = useFileStore((state) => state.setFileTree);
	const [setFileTree, setSelectedFolder] = useFileStore((state) => [
		state.setFileTree,
		state.setSelectedFolder,
	]);

	async function openFolderCallback() {
		const selectedFolder = await open({
			multiple: false,
			directory: true,
		});

		const fileTree: PathElement[] = await invoke("generate_file_tree", {
			folderPath: selectedFolder,
		});

		setSelectedFolder(selectedFolder as string);
		setFileTree(fileTree);
	}

	return (
		<MenuItem
			title="Open Folder"
			keybind="Ctrl + K"
			callback={openFolderCallback}
			compact={compact}
		/>
	);
}

export default function MenuDropdown({
	setFileMenuOpen,
	fileMenuOpen,
	mouseOverButton,
}: {
	setFileMenuOpen: (value: boolean) => void;
	fileMenuOpen: boolean;
	mouseOverButton: boolean;
}) {
	const dropdownRef = useRef(null);
	const compact = false;

	useClickOutside(dropdownRef, () => {
		// TODO: Needs a check to see if the dropdown is open
		// Unnecessary calls otherwise
		if (!mouseOverButton) {
			setFileMenuOpen(false);
		}
	});

	return (
		<div
			ref={dropdownRef}
			className={`w-max h-min ml-1 absolute bg-base-100 top-10
            ${!fileMenuOpen && "hidden"}
            shadow-lg rounded-md menu z-50
        `}
		>
			<table className="table table-xs">
				<tbody>
					<MenuItem
						title="New File"
						keybind="Ctrl + N"
						callback={() => {}}
						compact={compact}
					/>

					<MenuItem
						title="Open File"
						keybind="Ctrl + O"
						callback={() => {}}
						compact={compact}
					/>

					<OpenFolder compact={compact} />

					<MenuItem
						title="Save"
						keybind="Ctrl + S"
						callback={() => {}}
						compact={compact}
					/>

					<MenuItem
						title="Save All"
						keybind="Ctrl + Shift + S"
						callback={() => {}}
						compact={compact}
					/>
				</tbody>
			</table>
		</div>
	);
}
