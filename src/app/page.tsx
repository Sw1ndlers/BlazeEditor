"use client";

import React, { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import chroma from "chroma-js";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import useCssColor from "@/utils/Hooks/CssColor";
import { useTabStore } from "@/utils/Stores/TabStore";

export default function Home() {
	const headerHeight = 66;
	const backgroundColor = useCssColor("base-200");
	const contextMenuColor = useCssColor("base-100");
	const contextTextColor = useCssColor("base-content");

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

		editorStyle.setProperty("--vscode-menu-background", contextMenuColor.hex());
		editorStyle.setProperty(
			"--vscode-menu-selectionBackground",
			backgroundColor.hex(),
		);
		editorStyle.setProperty("--vscode-menu-foreground", contextTextColor.hex());

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
				"editor.background": backgroundColor.hex(),
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
            return
        }

        if (activeTab.validUtf == false) {
            editor.setValue("File not displayable in editor");
            return
        }

        editor.setValue(activeTab.content);


    }, [activeTab, editor, editorMonaco]);

	return (
		<div className="flex flex-col max-w-screen max-h-screen bg-base-200">
			{/* Div to store colors for use in useCssColor */}
			<div className="bg-base-content absolute size-0"></div>

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
				<div className="flex-grow w-0.5 h-full -ml-3 pt-1 pb-2 pr-1">
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
