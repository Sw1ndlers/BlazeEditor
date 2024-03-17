import getElementIcon, {
	ElementIconProps,
} from "@/utils/Elements/GetElementIcon";
import { TabData, useTabStore } from "@/utils/Stores/TabStore";
import { FileElement } from "@/utils/Types/FileSystem";
import { IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";

export function DecoratedTab({
	fileElement,
	iconColor,
	tabData,
	activeTab,
}: {
	fileElement: FileElement;
	iconColor: string;
	tabData: TabData;
	activeTab: TabData | null;
}) {
	const tabRef = useRef<HTMLDivElement>(null);
	const setActiveTab = useTabStore((state) => state.setActiveTab);
	const iconProps: ElementIconProps = {
		size: 14,
		className: "-mr-1",
		strokeWidth: 1.2,
		color: iconColor,
	};

	const [closeButtonHovered, setCloseButtonHovered] = useState(false);
	const icon = getElementIcon(fileElement, iconProps);

	let tabOpen = false;

	if (activeTab !== null) {
		tabOpen =
			activeTab.fileElement.absolutePath ===
			tabData.fileElement.absolutePath;
	}

	function onCloseButtonHover() {
		setCloseButtonHovered(true);
	}

	function onCloseButtonUnhover() {
		setCloseButtonHovered(false);
	}

	function onClick() {
		if (closeButtonHovered) {
			return;
		}

		setActiveTab(tabData.fileElement);
	}

	return (
		<div
			ref={tabRef}
			onClick={onClick}
			className={`
                        group tab flex h-full w-max min-w-28 
                        items-center justify-center gap-1 rounded-t-sm 
                        p-2 hover:cursor-pointer
                        ${tabOpen ? "tab-open" : "tab-closed"}
                        ${
							tabOpen
								? "bg-base-100"
								: "border-b-1 border-b-base-300 opacity-75"
						}    
                    `}
		>
			{icon}

			<p className=" ml-1 text-xs ">{tabData.fileElement.name}</p>

			<div className="invisible ml-auto rounded-sm p-0.5 hover:bg-base-200 group-hover:visible">
				<IconX
					size={14}
					onMouseEnter={onCloseButtonHover}
					onMouseLeave={onCloseButtonUnhover}
				/>
			</div>
		</div>
	);
}
