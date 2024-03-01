import {
	IconBrandChrome,
	IconBrandHtml5,
	IconBrandRust,
	IconFlame,
	IconHtml,
	IconX,
} from "@tabler/icons-react";
import FileButton from "./Buttons/FileButton";
import ActionButtons from "./Buttons/ActionButtons";
import useCssColor from "@/utils/Hooks/CssColor";

function Tab({ active }: { active: boolean }) {
	return (
		<div
			className={`
                        min-w-28 rounded-t-sm h-full  flex 
                        justify-center items-center p-2 gap-1 
                        group hover:cursor-pointer
                        ${
							active
								? "bg-base-100"
								: "border-b-base-300 opacity-75 border-b-2"
						}                   
                    `}
		>
			<IconBrandHtml5 size={14} />

			<p className="w-min text-xs ">index.html</p>

			<IconX
				className="ml-auto group-hover:visible invisible"
				size={14}
			/>
		</div>
	);
}

export default function Header({ headerHeight }: { headerHeight: number }) {
	const iconColor = useCssColor("base-content");

	if (iconColor === null) {
		return null;
	}

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

				<div
					data-tauri-drag-region
					className="flex-grow flex flex-row gap-0.5 h-full pt-2 ml-2"
				>
					<Tab active={true} />
					<Tab active={false} />
				</div>

				<ActionButtons iconColor={iconColor} />
			</div>
			<div className="h-min w-full flex flex-row bg-base-100 px-0.5 pb-0.5 pt-1">
				<FileButton headerHeight={headerHeight} />
			</div>
		</div>
	);
}
