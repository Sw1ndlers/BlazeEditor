"use client";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import {useCssColor, useCssColorHex} from "@/utils/Hooks/CssColor";
import { useTabStore } from "@/utils/Stores/TabStore";
import Editor from "@monaco-editor/react";
import chroma from "chroma-js";
import { useEffect, useState } from "react";

export default function Home() {
	const headerHeight = 66;
	const backgroundColor = useCssColorHex("base-200");
	const contextMenuColor = useCssColorHex("base-100");
	const contextTextColor = useCssColorHex("base-content");

	const [editorContent, setEditorContent] = useState<string>("");
	const [editorLanguage, setEditorLanguage] = useState<string>("plaintext");

	const [editor, setEditor] = useState<any>(null);
	const [editorMonaco, setEditorMonaco] = useState<any>(null);

	const activeTab = useTabStore((state) => state.activeTab);

	function handleEditorDidMount(editor: any, monaco: any) {
		if (!backgroundColor || !contextMenuColor || !contextTextColor) {
			console.error("No background color or context menu color");
			return;
		}

		const editorRoot = document.getElementsByClassName(
			"monaco-editor",
		)[0]! as HTMLDivElement;
		const editorStyle = editorRoot.style;

		editorStyle.setProperty(
			"--vscode-menu-background",
			contextMenuColor,
		);
		editorStyle.setProperty(
			"--vscode-menu-selectionBackground",
			backgroundColor,
		);
		editorStyle.setProperty(
			"--vscode-menu-foreground",
			contextTextColor,
		);

		const backgroundLuminance = chroma(backgroundColor).luminance();
		const selectionForground =
			backgroundLuminance > 0.5
				? chroma(backgroundColor).darken(5)
				: chroma(backgroundColor).brighten(5);

		editorStyle.setProperty(
			"--vscode-menu-selectionForeground",
			selectionForground.hex(),
		);

		monaco.editor.defineTheme("my-theme", {
			base: "vs-dark",
			inherit: true,
			rules: [],
			colors: {
				"editor.background": backgroundColor,
			},
		});

		monaco.editor.setTheme("my-theme");
		editor.focus();

		setEditor(editor);
		setEditorMonaco(monaco);
	}

	// Resize the editor when the window resizes
	useEffect(() => {
		window.onresize = () => {
			if (editor) {
				editor.layout({});
			}
		};
	}, [editor]);

	// Change the value of the editor when the active tab changes
	useEffect(() => {
		if (!activeTab || !editor || !editorMonaco) {
			return;
		}

		if (activeTab.validUtf == false) {
			editor.setValue("File not displayable in editor");
			return;
		}

		editor.setValue(activeTab.content);
	}, [activeTab, editor, editorMonaco]);

	return (
		<div className="max-w-screen flex max-h-screen flex-col bg-base-200">
			{/* Div to store colors for use in useCssColor */}
			<div className="absolute size-0 bg-base-content"></div>

			<Header headerHeight={headerHeight} />

			<div
				style={{
					height: `calc(100vh - ${headerHeight}px)`,
				}}
				className="flex flex-row"
			>
				{/* Sidebar */}
				<Sidebar headerHeight={headerHeight} />

				{/* Editor */}
				<div className="-ml-3 h-full w-0.5 flex-grow pb-2 pr-1 pt-1">
					{backgroundColor && contextMenuColor && (
						<Editor
							defaultLanguage="plaintext"
							defaultValue="console.log('Best Editor')"
							onMount={handleEditorDidMount}
							path={activeTab?.fileElement.absolutePath}
							// language={editorLanguage}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
