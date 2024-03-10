import { TabElementType } from "@/utils/Types/Tabs";

export default function TabWrapper({
	tab,
	tabs,
	setTabs,
}: {
	tab: TabElementType;
	tabs: TabElementType[];
	setTabs: any;
}) {
	const tabId = tab.order;

	function swapTabs(index1: number, index2: number) {
		let newTabs = [...tabs];

		let tab1Index = newTabs.findIndex((tab) => tab.order === index1);
		let tab2Index = newTabs.findIndex((tab) => tab.order === index2);

		newTabs[tab1Index].order = index2;
		newTabs[tab2Index].order = index1;

		// Sort by order
		newTabs.sort((a, b) => a.order - b.order);

		setTabs(newTabs);
	}

	function dragEnter(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
	}

	function dragOver(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
	}

	function dragStart(event: React.DragEvent<HTMLDivElement>) {
		event.dataTransfer.setData("number", tabId.toString());
	}

	function onDrop(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();

		const tabDroppedData = event.dataTransfer.getData("number");
		const tabDropped = parseInt(tabDroppedData);

		swapTabs(tabDropped, tabId);
	}

	return (
		<div
			draggable={true}
			className="select-none"
			onDragStart={dragStart}
			onDrop={onDrop}
			// Disable default drag and drop
			onDragEnter={dragEnter}
			onDragOver={dragOver}
		>
			{tab.element}
		</div>
	);
}