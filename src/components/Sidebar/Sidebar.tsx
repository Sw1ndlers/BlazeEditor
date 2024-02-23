import { useState } from "react";
import ExplorerTab from "./Explorer/ExplorerTab";

export default function Sidebar() {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

	function toggleSidebar() {
		setSidebarCollapsed(!sidebarCollapsed);
	}

	return (
        // Important for this to have a higher z index so editor doesent cover it
		<div
			className={`
                ${sidebarCollapsed ? "w-6" : "w-48"}
                ${sidebarCollapsed ? "justify-center" : "px-2"} 
                h-full bg-base-300 flex z-10`}
		>
			<ExplorerTab
				toggleSidebar={toggleSidebar}
                sidebarCollapsed={sidebarCollapsed}
				rotated={sidebarCollapsed}
			/>
		</div>
	);
}
