import { useCssColor, useCssColorHex } from "@/utils/Hooks/CssColor";
import useSetCssColor from "@/utils/Hooks/SetCssColor";
import { TabData, useTabStore } from "@/utils/Stores/TabStore";
import React, { ReactNode, useRef } from "react";
import { DecoratedTab } from "./TabFunctionality/DecoratedTab";
import { TabWrapper } from "./TabFunctionality/TabWrapper";

export default function Tabs() {
	const inactiveHoverColor = useCssColor("base-100");
	const iconColor = useCssColorHex("base-content");

	const tabContainerRef = useRef<HTMLDivElement>(null);
	const activeTab = useTabStore((state) => state.activeTab);
	const tabList = useTabStore((state) => state.tabList);

	useSetCssColor(inactiveHoverColor, "inactive-hover-color", tabContainerRef);

	if (iconColor === null || inactiveHoverColor === null) {
		return null;
	}

	function onWheel(event: React.WheelEvent) {
		if (tabContainerRef.current) {
			tabContainerRef.current.scrollLeft += event.deltaY;
		}
	}

	const tabContainerChildren: {
		tabData: TabData;
		element: ReactNode;
	}[] = [];

	let i = 1;

	for (const absolutePath in tabList) {
		const tabData = tabList[absolutePath];
		tabData.order = tabData.order || i;

		tabContainerChildren.push({
			tabData: tabData,
			element: (
				<DecoratedTab
					fileElement={tabData.fileElement}
					iconColor={iconColor}
					tabData={tabData}
					activeTab={activeTab}
				/>
			),
		});

		i++;
	}

	tabContainerChildren.sort((a, b) => a.tabData.order! - b.tabData.order!);

	return (
		<div
			data-tauri-drag-region
			className="h-full flex-grow overflow-x-hidden "
		>
			<div
				data-tauri-drag-region
				onWheel={onWheel}
				ref={tabContainerRef}
				className="ml-2 flex h-full w-full flex-row gap-0.5 overflow-y-hidden overflow-x-scroll px-2 pt-2"
			>
				{tabContainerChildren.map((tab, index) => {
					return (
						<TabWrapper
							tabData={tab.tabData}
							decoratedElement={tab.element}
							key={index}
						/>
					);
				})}
			</div>

			<></>
		</div>
	);
}
