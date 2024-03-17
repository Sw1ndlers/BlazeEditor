import { useState } from "react";
import MenuDropdown from "../Menu/Dropdown";

export default function FileButton({ headerHeight }: { headerHeight: number }) {
	const [fileMenuOpen, setFileMenuOpen] = useState(false);
	const [mouseOverButton, setMouseOverButton] = useState(false);

	function toggleFileMenu() {
		setFileMenuOpen(!fileMenuOpen);
	}

	return (
		<div className="z-20 flex flex-col">
			<div
				className="mx-1 rounded-sm px-2 py-[2px] hover:bg-base-200"
				onClick={toggleFileMenu}
				onMouseEnter={() => setMouseOverButton(true)}
				onMouseLeave={() => setMouseOverButton(false)}
			>
				<p className="cursor-pointer text-xs">File</p>
			</div>

			<MenuDropdown
				fileMenuOpen={fileMenuOpen}
				setFileMenuOpen={setFileMenuOpen}
				mouseOverButton={mouseOverButton}
			/>
		</div>
	);
}
