import { TabData, useTabStore } from "@/utils/Stores/TabStore";
import React, { ReactNode } from "react";

export function TabWrapper({
	tabData,
	decoratedElement,
}: {
	tabData: TabData;
	decoratedElement: ReactNode;
}) {
	const setTabOrder = useTabStore((state) => state.setTabOrder);
	const tabList = useTabStore((state) => state.tabList);
	const currentTabOrder = tabData.order!;

	function dragEnter(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
	}

	function dragOver(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
	}

	function dragStart(event: React.DragEvent<HTMLDivElement>) {
		event.dataTransfer.setData("number", currentTabOrder.toString());
	}

	function onDrop(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();

		const droppedOnTabData = event.dataTransfer.getData("number");
		const droppedOnTabOrder = parseInt(droppedOnTabData);

		const currentTab = Object.values(tabList).find(
			(tab) => tab.order === droppedOnTabOrder,
		)!;
		const droppedTab = Object.values(tabList).find(
			(tab) => tab.order === currentTabOrder,
		)!;

		const currentTabOrderDrop = currentTab.order!;
		const tabDroppedOrderDrop = droppedTab.order!;

		setTabOrder(currentTab.fileElement, tabDroppedOrderDrop);
		setTabOrder(droppedTab.fileElement, currentTabOrderDrop);
	}

    const tabDataClone = JSON.parse(JSON.stringify(tabData))
    tabDataClone["content"] = "content"

	return (
		<div
			draggable
			onDragEnter={dragEnter}
			onDragOver={dragOver}
			onDragStart={dragStart}
			onDrop={onDrop}
            className=" group"
		>
			{decoratedElement}
			<p className="group absolute invisible group-hover:visible p-2 bg-base-100 w-min h-min z-50 text-xs whitespace-pre">
                {JSON.stringify(tabDataClone, null, 4)}
            </p>
		</div>
	);
}
