import getElementIcon from "@/utils/Elements/GetElementIcon";
import { useTabStore } from "@/utils/Stores/TabStore";
import { FileElement } from "@/utils/Types/FileSystem";

export default function FileNode({
	fileElement,
	iconColor,
}: {
	fileElement: FileElement;
	iconColor: string;
}) {
	const setActiveTab = useTabStore((state) => state.setActiveTab);

	const iconProps = {
		size: 15,
		className: "-mr-1",
		strokeWidth: 1.2,
		color: iconColor,
	};

	function onClick() {
		// console.log(`File: ${JSON.stringify(fileElement)}`);
		setActiveTab(fileElement);
	}

	return (
		<li onClick={onClick}>
			<a>
				{getElementIcon(fileElement, iconProps)}

				<p className="overflow-hidden text-ellipsis text-nowrap">
					{fileElement.name}
				</p>
			</a>
		</li>
	);
}
