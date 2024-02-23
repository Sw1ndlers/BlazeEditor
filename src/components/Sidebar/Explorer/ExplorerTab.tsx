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
                rounded-sm flex items-center ${flexDirection} 
                gap-1 select-none hover:bg-base-100 h-min 
                
                ${sidebarCollapsed ? "px-0.5 py-1" : "py-0.5 px-2"}
                ${sidebarCollapsed ? "w-min" : "w-full"}
                
            `}
		>
			<IconFolder size={12} className={folderRotation} />
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