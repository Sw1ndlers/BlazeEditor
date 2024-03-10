import { TabElementType } from "@/utils/Types/Tabs";
import React, { ReactNode, useState, useEffect, useRef } from "react";
import TabWrapper from "./TabWrapper";

export type TabContainerChild = {
    element: ReactNode;
    order: number;
    absolutePath: string;
}

export default function TabContainer({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	const [tabs, setTabs] = useState<TabElementType[]>([]);
	const tabContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let newTabs: TabElementType[] = [];

		React.Children.forEach(children, (child, index) => {
			newTabs.push({
				element: child,
				order: index,
			});
		});

		setTabs(newTabs);
	}, [children]);

	function onWheel(event: React.WheelEvent) {
		if (tabContainerRef.current) {
            console.log(event.deltaY);
			tabContainerRef.current.scrollLeft += event.deltaY;
            console.log(tabContainerRef.current.scrollLeft)
		}
	}

	return (
		<div className={className} ref={tabContainerRef} onWheel={onWheel}>
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
