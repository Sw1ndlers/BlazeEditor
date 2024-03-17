import { IconFolder } from "@tabler/icons-react";

export default function ExplorerTab({
	toggleSidebar,
	sidebarCollapsed,
	rotated,
}: {
	toggleSidebar: () => void;
	sidebarCollapsed: boolean;
	rotated: boolean;
}) {
	const folderRotation = rotated ? "rotate-90" : ""; // Div wrapper rotation
	const writingMode = rotated ? "vertical-rl" : "horizontal-tb"; // Text rotation
	const flexDirection = rotated ? "flex-col" : "flex-row"; // Flex direction, fix alignment when rotated

	return (
		<div
			onClick={toggleSidebar}
			className={`
                flex items-center rounded-sm ${flexDirection} 
                h-min select-none gap-1 font-bold

                ${sidebarCollapsed ? "hover:bg-base-200" : " bg-base-200"}
                
                ${sidebarCollapsed ? "px-0.5 py-1" : "px-2 py-[0.35rem]"}
                ${sidebarCollapsed ? "w-min" : "h-6 w-full"}
                
            `}
		>
			<IconFolder size={14} className={folderRotation} />
			<p
				style={{
					writingMode: writingMode,
				}}
				className="text-xs"
			>
				Explorer
			</p>
		</div>
	);
}
