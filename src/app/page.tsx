"use client";

import EditorWrapper from "@/components/EditorWrapper/EditorWrapper";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useCssColorHex } from "@/utils/Hooks/CssColor";
import { useTabStore } from "@/utils/Stores/TabStore";
import Editor from "@monaco-editor/react";
import chroma from "chroma-js";
import { useEffect, useState } from "react";

export default function Home() {
	const headerHeight = 66;


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
                    <EditorWrapper />
				</div>
			</div>
		</div>
	);
}
