import { Dispatch, RefObject, SetStateAction, useRef } from "react";

export default function ResizeDragger({
	containerRef,
	containerWidth,
	setContainerWidth,
	height,
}: {
	containerRef: RefObject<HTMLDivElement>;
	containerWidth: number | null;
	setContainerWidth: Dispatch<SetStateAction<number | null>>;
	height: string;
}) {
	const draggerRef = useRef<HTMLDivElement>(null);

	function onMouseDownDragger(event: React.MouseEvent<HTMLDivElement>) {
		const sidebar = containerRef.current;
		const dragger = draggerRef.current;

		if (!sidebar || !dragger) return;

		const sidebarWidth = sidebar.offsetWidth;
		const initialX = event.clientX;

		document.onmousemove = (event) => {
			const offset = event.clientX - initialX;
			const newWidth = Math.max(100, sidebarWidth + offset);

			setContainerWidth(newWidth);

			sidebar.style.width = `${newWidth}px`;
			dragger.style.left = `${newWidth}px`;
		};

		document.onmouseup = () => {
			document.onmousemove = null;
			document.onmouseup = null;
		};
	}

	return (
		<div
			onMouseDown={onMouseDownDragger}
			ref={draggerRef}
			style={{
				left: (containerWidth != null && containerWidth) || "16rem",
				height: height,
			}}
			className="absolute w-1 hover:cursor-w-resize"
		></div>
	);
}
