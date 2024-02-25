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
                gap-1 select-none h-min font-bold

                ${sidebarCollapsed ? "hover:bg-base-100" : " bg-base-100"}
                
                ${sidebarCollapsed ? "px-0.5 py-1" : " py-[0.35rem] px-2"}
                ${sidebarCollapsed ? "w-min" : "w-full h-6"}
                
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
