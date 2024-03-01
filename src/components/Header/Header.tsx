import { IconBrandHtml5, IconFlame, IconX } from "@tabler/icons-react";
import FileButton from "./Buttons/FileButton";
import ActionButtons from "./Buttons/ActionButtons";
import useCssColor, { rgbaToCss } from "@/utils/Hooks/CssColor";
import { Color } from "chroma-js";
import { ReactNode, useEffect, useRef, useState } from "react";
import React from "react";

type TabType = {
	element: ReactNode;
	order: number;
};

function TabContainer({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	const [tabs, setTabs] = useState<TabType[]>([]);

	useEffect(() => {
		let newTabs: TabType[] = [];

		React.Children.forEach(children, (child, index) => {
			newTabs.push({
				element: child,
				order: index,
			});
		});

		setTabs(newTabs);
	}, [children]);

	return (
		<div className={className}>
			{tabs.map((tab) => {
				return (
					<TabWrapper
						tab={tab}
						tabs={tabs}
						setTabs={setTabs}
						key={tab.order}
					/>
				);
			})}
		</div>
	);
}

function TabWrapper({
	tab,
	tabs,
	setTabs,
}: {
	tab: TabType;
	tabs: TabType[];
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

function Tab({ active }: { active: boolean }) {
    const inactiveHoverColor = useCssColor("base-100");
	const tabRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (tabRef.current !== null && inactiveHoverColor !== null) {
            const cssStyle = rgbaToCss(
                (inactiveHoverColor as Color).alpha(0.75).rgba()
            );

			tabRef.current.style.setProperty(
				"--inactive-hover-color",
				cssStyle,
			);
		}
	}, [inactiveHoverColor]);

	if (inactiveHoverColor === null) {
		return null;
	}

	return (
		<div
			ref={tabRef}
			className={`
                        tab ${active ? "tab-active" : "tab-inactive"}
                        min-w-28 rounded-t-sm h-full  flex 
                        justify-center items-center p-2 gap-1 
                        group hover:cursor-pointer
                        ${
							active
								? "bg-base-100"
								: "border-b-base-300 opacity-75 border-b-1"
						}    
                    `}
		>
			<IconBrandHtml5 size={14} />

			<p className="w-min text-xs ">index.html</p>

			<div className="group-hover:visible invisible ml-auto rounded-sm p-0.5 hover:bg-base-200">
				<IconX size={14} />
			</div>
		</div>
	);
}

export default function Header({ headerHeight }: { headerHeight: number }) {
	let iconColor: string | Color | null = useCssColor("base-content");

	if (iconColor === null) {
		return null;
	}

	iconColor = iconColor.hex();

	return (
		<div>
			<div
				data-tauri-drag-region
				className="w-full flex items-center px-2 bg-base-300"
				style={{
					// -24 for the file button container
					height: `${headerHeight - 26}px`,
				}}
			>
				<div data-tauri-drag-region className="flex items-center">
					<IconFlame data-tauri-drag-region />
				</div>

				<div data-tauri-drag-region>
					<TabContainer className="flex-grow flex flex-row gap-0.5 h-full pt-2 ml-2">
						<Tab active={true} />
						<Tab active={false} />
					</TabContainer>
					{/* <Tab active={false} /> */}
				</div>

				<ActionButtons iconColor={iconColor} />
			</div>
			<div className="h-min w-full flex flex-row bg-base-100 px-0.5 pb-0.5 pt-1">
				<FileButton headerHeight={headerHeight} />
			</div>
		</div>
	);
}
