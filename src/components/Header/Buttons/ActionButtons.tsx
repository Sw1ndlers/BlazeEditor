import { IconMinus, IconSquare, IconX } from "@tabler/icons-react";
import { WebviewWindow } from "@tauri-apps/api/window";
import { ReactNode, useState, useEffect } from "react";

function ActionButton({
	children,
	appWindow,
	hoverClass,
	actionType,
}: {
	children: ReactNode;
	appWindow: WebviewWindow;
	hoverClass: string;
	actionType: "minimize" | "maximize" | "close";
}) {
	function onClick(actionType: string) {
		switch (actionType) {
			case "minimize":
				appWindow.minimize();
				break;
			case "maximize":
				appWindow.maximize();
				break;
			case "close":
				appWindow.close();
				break;
			default:
				break;
		}
	}

	return (
		<div
			className={`${hoverClass} size-8 flex justify-center items-center rounded-sm p-1`}
			onClick={() => onClick(actionType)}
		>
			{children}
		</div>
	);
}

export default function ActionButtons() {
	const [appWindow, setAppWindow] = useState<WebviewWindow | null>(null);

	// Fix issues with async imports
	async function setupAppWindow() {
		const appWindow = (await import("@tauri-apps/api/window")).appWindow;
		setAppWindow(appWindow);
	}

	useEffect(() => {
		setupAppWindow();
	}, []);

	return (
		<div className="flex ml-auto items-center">
			<ActionButton
				appWindow={appWindow!}
				hoverClass="hover:bg-base-200"
				actionType="minimize"
			>
				<IconMinus size={18} />
			</ActionButton>

			<ActionButton
				appWindow={appWindow!}
				hoverClass="hover:bg-base-200"
				actionType="maximize"
			>
				<IconSquare size={15} />
			</ActionButton>

			<ActionButton
				appWindow={appWindow!}
				hoverClass="hover:bg-error"
				actionType="close"
			>
				<IconX size={20} className="mr-[1px]" />
			</ActionButton>
		</div>
	);
}
