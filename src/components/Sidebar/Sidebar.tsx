import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import ExplorerTab from "./Explorer/ExplorerTab";
import ResizeDragger from "../Global/ResizeDragger";
import FileTree from "./FileTree/FileTree";
import { PathElement } from "@/utils/Types/FileSystem";
import { useFileStore } from "@/utils/Stores/FileStore";
import { getFolderName } from "@/utils/Functions/FileSystem";

export default function Sidebar({ headerHeight }: { headerHeight: number }) {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
	// const fileTree = useFileStore((state) => state.fileTree);
	const [fileTree, selectedFolder] = useFileStore((state) => [
		state.fileTree,
		state.selectedFolder,
	]);

	// const fileStructure: PathElement[] = [
	// 	{
	// 		type: "file",
	// 		name: "Executable",
	// 		extension: "exe",
	// 	},
	// 	{
	// 		type: "folder",
	// 		name: "Top Level Folder",
	// 		children: [
	// 			{
	// 				type: "file",
	// 				name: "Resume",
	// 				extension: "pdf",
	// 			},
	// 			{
	// 				type: "folder",
	// 				name: "Second Level Folder",
	// 				children: [],
	// 			},
	// 			{
	// 				type: "folder",
	// 				name: "Second Level Folder 2",
	// 				children: [
	// 					{
	// 						type: "file",
	// 						name: "Resume",
	// 						extension: "pdf",
	// 					},
	// 					{
	// 						type: "folder",
	// 						name: "Third Level Folder",
	// 						children: [],
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// ];

	const [sidebarWidth, setSidebarWidth] = useState<number | null>(null);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const fileTreeElement = useMemo(() => {
		return (
			<FileTree
				folderName={
					(selectedFolder && getFolderName(selectedFolder)) ||
					"No Folder Selected"
				}
				fileStructure={fileTree}
				sidebarCollapsed={sidebarCollapsed}
			/>
		);
	}, [fileTree, selectedFolder, sidebarCollapsed]);

	function toggleSidebar() {
		setSidebarCollapsed(!sidebarCollapsed);
	}

	return (
		// Important for this to have a higher z index so editor doesent cover it
		<div
			ref={sidebarRef}
			style={{
				width: sidebarCollapsed
					? "1.75rem"
					: (sidebarWidth != null && sidebarWidth) || "12rem",
				scrollbarGutter: "both",
			}}
			className={`
                ${sidebarCollapsed ? "justify-center" : "px-1.5"} 
                ${sidebarCollapsed ? "block" : "flex flex-col"}
                min-h-full bg-base-300 flex z-10 px-0 select-none
                overflow-x-hidden overflow-y-scroll text-ellipsis
            `}
		>
			{!sidebarCollapsed && (
				<ResizeDragger
					containerRef={sidebarRef}
					containerWidth={sidebarWidth}
					setContainerWidth={setSidebarWidth}
					height={`calc(100vh - ${headerHeight}px)`}
				/>
			)}

			<ExplorerTab
				toggleSidebar={toggleSidebar}
				sidebarCollapsed={sidebarCollapsed}
				rotated={sidebarCollapsed}
			/>

			{/* Tab and File Tree Seperator */}
			{!sidebarCollapsed && (
				<div className="min-h-0.5 w-full bg-base-100 my-1"></div>
			)}

			{fileTreeElement}
		</div>
	);
}
