"use client";

import React, { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import chroma from "chroma-js";
import { splitOklchString } from "@/functions/colors";
import Header from "@/components/Header/Header";
import { IconArrowLeft, IconFolder } from "@tabler/icons-react";
import Sidebar from "@/components/Sidebar/Sidebar";

type Tab = {
	element: ReactNode;
	order: number;
};

function TabContainer({ children }: { children: ReactNode }) {
	const [tabs, setTabs] = useState<Tab[]>([]);

	useEffect(() => {
		let newTabs: Tab[] = [];

		React.Children.forEach(children, (child, index) => {
			newTabs.push({
				element: child,
				order: index,
			});
		});

		setTabs(newTabs);
	}, [children]);

	return (
		<div className="flex gap-4 p-4">
			{tabs.map((tab) => {
				return (
					<Tab
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

function Tab({ tab, tabs, setTabs }: { tab: Tab; tabs: Tab[]; setTabs: any }) {
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
			className="border border-black select-none"
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



export default function Home() {
	const headerHeight = 40;
	const backgroundRef = useRef(null);
	const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
	const [editor, setEditor] = useState<any>(null);

	useEffect(() => {
		if (backgroundRef.current) {
			const backgroundStyles = getComputedStyle(backgroundRef.current);
			const backgroundColor: string =
				backgroundStyles.getPropertyValue("background-color");

			console.log(backgroundColor);

			setBackgroundColor(backgroundColor);
		}
	}, []);

	function handleEditorDidMount(editor: any, monaco: any) {
		if (!backgroundColor) {
			console.error("No background color");
			return;
		}

		const backgroundOklch = splitOklchString(backgroundColor);
		const backgroundHex = chroma.oklch(...backgroundOklch).hex();

		monaco.editor.defineTheme("my-theme", {
			base: "vs-dark",
			inherit: true,
			rules: [],
			colors: {
				"editor.background": backgroundHex,
			},
		});

		monaco.editor.setTheme("my-theme");
		editor.focus();

		editor.EditorOption;

		setEditor(editor);
	}

	useEffect(() => {
		window.onresize = () => {
			if (editor) {
				editor.layout({});
			}
		};
	}, [editor]);

	return (
		<div
			ref={backgroundRef}
			className="flex flex-col w-screen h-screen bg-base-200 "
		>
			<Header headerHeight={headerHeight} />

			<div
				style={{
					height: `calc(100vh - ${headerHeight}px)`,
				}}
				className="flex flex-row"
			>
				{/* Sidebar */}
				<Sidebar />

				{/* Editor */}
				{/* TODO: Figure out why the fuck w-0.5 makes the sidebar resize correctly */}
				<div className="flex-grow w-0.5 h-full -ml-3">
					{backgroundColor && (
						<Editor
							defaultLanguage="typescript"
							defaultValue="// Default Comment"
							onMount={handleEditorDidMount}
						/>
					)}
				</div>
			</div>

			{/* <div className=" w-[600px] h-[400px] bg-base-200">
				<TabContainer>
					<div className="w-24 h-8 bg-blue-800"></div>
					<div className="w-24 h-8 bg-red-800"></div>
					<div className="w-24 h-8 bg-yellow-800"></div>
					<div className="w-24 h-8 bg-violet-800"></div>
				</TabContainer>
			</div> */}
		</div>
	);
}
