import useCssColor from "@/utils/Hooks/CssColor";
import useSetCssColor from "@/utils/Hooks/SetCssColor";
import { TabElementType } from "@/utils/Types/Tabs";
import { IconBrandHtml5, IconX } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import TabContainer from "./TabContainer/TabContainer";
import getElementIcon, {
	ElementIconProps,
} from "@/utils/Elements/GetElementIcon";
import { FileElement } from "@/utils/Types/FileSystem";
import { Color } from "chroma-js";
import { TabData, useTabStore } from "@/utils/Stores/TabStore";

function Tab({
	tab,
	iconColor,
	tabData,
	activeTab,
}: {
	tab: FileElement;
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
	const icon = getElementIcon(tab, iconProps);

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
                        tab min-w-28 w-max rounded-t-sm h-full flex 
                        justify-center items-center p-2 gap-1 
                        group hover:cursor-pointer
                        ${tabOpen ? "tab-open" : "tab-closed"}
                        ${
							tabOpen
								? "bg-base-100"
								: "border-b-base-300 opacity-75 border-b-1"
						}    
                    `}
		>
			{/* <IconBrandHtml5 size={14} /> */}
			{icon}

			<p className=" text-xs ml-1 ">{tabData.fileElement.name}</p>

			<div className="group-hover:visible invisible ml-auto rounded-sm p-0.5 hover:bg-base-200">
				<IconX
					size={14}
					onMouseEnter={onCloseButtonHover}
					onMouseLeave={onCloseButtonUnhover}
				/>
			</div>
		</div>
	);
}

export default function Tabs() {
	const inactiveHoverColor = useCssColor("base-100");
	const tabContainerRef = useRef<HTMLDivElement>(null);

	const activeTab = useTabStore((state) => state.activeTab);
	const tabData = useTabStore((state) => state.tabData);

	let iconColor: string | null | Color = useCssColor("base-content");
	useSetCssColor(inactiveHoverColor, "inactive-hover-color", tabContainerRef);

	if (iconColor === null || inactiveHoverColor === null) {
		return null;
	}

	iconColor = iconColor.hex();

	return (
		<div
			data-tauri-drag-region
			ref={tabContainerRef}
			className="flex-grow h-full overflow-x-hidden "
		>
			<TabContainer className="flex w-full h-full flex-row gap-0.5 pt-2 px-2 ml-2 overflow-x-scroll overflow-y-hidden ">
				{Object.keys(tabData).map((absolutePath) => {
					return (
						<Tab
							key={absolutePath}
							tab={tabData[absolutePath].fileElement}
							iconColor={iconColor}
							tabData={tabData[absolutePath]}
							activeTab={activeTab}
						/>
					);
				})}

				<></>
			</TabContainer>
		</div>
	);
}
