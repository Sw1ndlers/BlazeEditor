import { getFolderName } from "@/utils/Functions/FileSystem";
import { useFileStore } from "@/utils/Stores/FileStore";
import { useMemo, useRef, useState } from "react";
import ResizeDragger from "../Global/ResizeDragger";
import ExplorerTab from "./Explorer/ExplorerTab";
import FileTree from "./FileTree/FileTree";

export default function Sidebar({ headerHeight }: { headerHeight: number }) {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
	const [fileTree, selectedFolder] = useFileStore((state) => [
		state.fileTree,
		state.selectedFolder,
	]);

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
					: (sidebarWidth != null && sidebarWidth) || "16rem",
				scrollbarGutter: "both",
			}}
			className={`
                ${sidebarCollapsed ? "justify-center" : "px-1.5"} 
                ${sidebarCollapsed ? "block" : "flex flex-col"}
                z-10 flex max-h-full select-none overflow-x-hidden overflow-y-hidden
                text-ellipsis bg-base-100  px-0
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
				<div className="my-1 min-h-0.5 w-full bg-base-200"></div>
			)}

			{fileTreeElement}
		</div>
	);
}
