import { useCssColorHex } from "@/utils/Hooks/CssColor";
import { useTabStore } from "@/utils/Stores/TabStore";
import { Editor } from "@monaco-editor/react";
import chroma from "chroma-js";
import { useEffect, useState } from "react";

function getEditorStyle(): CSSStyleDeclaration {
	const editorRoot = document.getElementsByClassName(
		"monaco-editor",
	)[0]! as HTMLDivElement;
	return editorRoot.style;
}

function setEditorStyle(
	editorStyle: CSSStyleDeclaration,
	backgroundColor: string,
	contextMenuColor: string,
	contextTextColor: string,
) {
	editorStyle.setProperty("--vscode-menu-background", contextMenuColor);
	editorStyle.setProperty(
		"--vscode-menu-selectionBackground",
		backgroundColor,
	);
	editorStyle.setProperty("--vscode-menu-foreground", contextTextColor);

	const backgroundLuminance = chroma(backgroundColor).luminance();
	const selectionForground =
		backgroundLuminance > 0.5
			? chroma(backgroundColor).darken(5)
			: chroma(backgroundColor).brighten(5);

	editorStyle.setProperty(
		"--vscode-menu-selectionForeground",
		selectionForground.hex(),
	);
}

export default function EditorWrapper() {
	const activeTab = useTabStore((state) => state.activeTab);

	const backgroundColor = useCssColorHex("base-200");
	const contextMenuColor = useCssColorHex("base-100");
	const contextTextColor = useCssColorHex("base-content");

	const [editorContent, setEditorContent] = useState<string>("");
	const [editorLanguage, setEditorLanguage] = useState<string>("plaintext");

	const [editor, setEditor] = useState<any>(null);
	const [editorMonaco, setEditorMonaco] = useState<any>(null);

	function handleEditorDidMount(editor: any, monaco: any) {
		if (!backgroundColor || !contextMenuColor || !contextTextColor) {
			console.error("No background color or context menu color");
			return;
		}

		const editorStyle = getEditorStyle();
		setEditorStyle(
			editorStyle,
			backgroundColor,
			contextMenuColor,
			contextTextColor,
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
		<>
			{backgroundColor && contextMenuColor && (
				<Editor
					defaultLanguage="plaintext"
					defaultValue="console.log('Best Editor')"
					onMount={handleEditorDidMount}
					path={activeTab?.fileElement.absolutePath}
				/>
			)}
		</>
	);
}
